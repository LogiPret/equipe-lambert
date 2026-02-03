**Contact Form Email Flow & API**

**Overview**: This document explains how the website handles contact form submissions and sends email (and optional notifications) without relying on Payload CMS. It includes environment variables, API endpoints, examples, and recommended security and retry behaviors.

**Environment Variables**:

- **GMAIL_USER**: Email address used to send messages (e.g., nlopez@logipret.ca).
- **GMAIL_APP_PASSWORD**: App password for SMTP (or use OAuth2 tokens when using Gmail API).
- **CONTACT_FORM_RECIPIENT_EMAIL**: The inbox that should receive contact form submissions.
- **N8N_WEBHOOK_URL**: Optional — a webhook URL for n8n workflows to forward submissions to automation pipelines.
- **TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_PHONE_NUMBER**: Optional — used to send SMS notifications after form submission.
- **NEXT_PUBLIC_SERVER_URL**: Public site URL used to construct absolute links in emails.

**High-level flow**:

1. User fills client-side form.
2. Client POSTs form JSON to a site API endpoint (e.g., `/api/contact`).
3. Server validates input, performs spam checks (captcha, rate limiting), and then:
   - Option A: POSTs the submission to `N8N_WEBHOOK_URL` for downstream automation.
   - Option B: Sends an email immediately using SMTP (nodemailer) via `GMAIL_USER` + `GMAIL_APP_PASSWORD`.
   - Optionally send an SMS notification using Twilio.
4. Server returns a 200/201 on success, or appropriate 4xx/5xx on error. Retry logic for transient failures should be implemented where appropriate.

**Client: Example submission (browser)**

```js
// example client-side submit
async function submitContact(data) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// payload example
/*
{
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 555 555 5555',
  message: 'I want to sell my house',
  source: 'landing-page-acheter'
}
*/
```

**Server: API Endpoint (Next.js / Node) — recommended structure**

Route: `POST /api/contact`

Responsibilities:

- Validate required fields (name, email, message).
- Validate/verify anti-spam (reCAPTCHA / honeypot / rate-limit per IP/email).
- Sanitize inputs.
- Attempt delivery: webhook first (if configured), then email; both can be used concurrently.
- Log submissions and error details (don’t log PII in plaintext where not necessary).

Example Node/Next.js handler using `nodemailer` and `fetch` for webhook:

```js
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

async function callN8nWebhook(body) {
  if (!process.env.N8N_WEBHOOK_URL) return null
  try {
    const r = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { ok: r.ok, status: r.status }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

async function sendEmail(submission) {
  const html = `
    <p>New contact form submission</p>
    <ul>
      <li><strong>Name</strong>: ${submission.name}</li>
      <li><strong>Email</strong>: ${submission.email}</li>
      <li><strong>Phone</strong>: ${submission.phone || '—'}</li>
      <li><strong>Message</strong>: ${submission.message}</li>
      <li><strong>Source</strong>: ${submission.source || 'site'}</li>
    </ul>
  `

  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
    subject: `Contact form: ${submission.name} — ${submission.source || ''}`,
    html,
  })
  return info
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const data = req.body

  // Basic validation
  if (!data?.name || !data?.email || !data?.message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // TODO: add rate-limiting & captcha checks

  // Fire webhook (non-blocking preferred)
  const webhookPromise = callN8nWebhook(data)

  // Send email (await if you want to guarantee delivery before responding)
  try {
    const emailInfo = await sendEmail(data)
    // optional: await webhookPromise if you want end-to-end
    webhookPromise.catch(() => {})
    return res.status(200).json({ ok: true, emailInfo })
  } catch (err) {
    // On failure: return 502 or 500 depending on the error
    const webhookResult = await webhookPromise
    return res.status(500).json({ ok: false, error: String(err), webhookResult })
  }
}
```

**n8n webhook flow**:

- If `N8N_WEBHOOK_URL` is present, the server can forward the raw submission JSON to that URL so n8n manages sending emails, creating CRM leads, or other automations.
- Prefer sending a minimal, well-typed JSON payload to n8n. Example:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+15555555555",
  "message": "Hello",
  "source": "landing-acheter",
  "timestamp": "2025-12-21T12:00:00Z"
}
```

**Alternative: Using Gmail API (OAuth2)**

- For higher sending quotas and better security, implement OAuth2 flow for Gmail (preferred for production). Store refresh tokens in a secure secret store and use them to obtain access tokens server-side.
- `GMAIL_APP_PASSWORD` is simpler (works if the account permits app passwords), but consider OAuth2 for long-term stability.

**Twilio SMS (optional)**

- If you want to send an SMS notification after successful submission, use the `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` env vars.

Example (Node):

```js
import Twilio from 'twilio'
const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
await client.messages.create({
  body: `New contact from ${submission.name} (${submission.email})`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: '+1xxxxxxxxxx', // team phone
})
```

**Validation, security & reliability recommendations**:

- Validate and sanitize all inputs server-side.
- Add reCAPTCHA (or hCaptcha) verification before accepting submissions.
- Rate-limit per IP and per email address to avoid spam.
- Use idempotency tokens if the client may retry submissions.
- Log submission attempts and results; redact or avoid logging sensitive PII.
- Implement retry/backoff for transient SMTP or webhook failures; record failures for manual review.
- Use monitoring/alerts for repeated email delivery failures.

**HTTP responses & status codes**:

- 200 OK / 201 Created: Submission accepted and processed.
- 400 Bad Request: Missing or invalid fields.
- 429 Too Many Requests: Rate limit exceeded.
- 500/502: Server or delivery errors.

**Testing**:
Curl example posting to the API:

```bash
curl -X POST https://www.equipelambert.ca/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@t.com","message":"Hi"}'
```

**Deployment notes**:

- Ensure all env vars are set in your hosting environment (e.g., Vercel secrets or other secret stores).
- If using `GMAIL_APP_PASSWORD`, ensure the Gmail account allows app passwords and that the app password is stored securely.
- If using OAuth2 for Gmail, keep refresh tokens and client secrets in the secret store and rotate them if needed.

**Extending / integrating with a CMS or DB**:

- If you later integrate with a CMS or DB, persist submissions (with a flag for processed/delivered) and use background workers to process delivery and retries.
- For Payload CMS specifically, create a collection like `contactSubmissions` and either POST to its API or write directly from your endpoint.

**Summary**: The recommended, minimal approach for this site is:

1. POST from client to `/api/contact`.
2. Server validates + sends to `N8N_WEBHOOK_URL` (if present) and/or sends email immediately via SMTP using `GMAIL_USER` + `GMAIL_APP_PASSWORD` to `CONTACT_FORM_RECIPIENT_EMAIL`.
3. Optionally notify via Twilio and persist in DB for audit/retries.

If you want, I can also:

- Add a ready-to-drop API file (`/src/pages/api/contact.ts` or `/src/app/api/contact/route.ts`) using the code above.
- Provide an n8n workflow JSON example to handle incoming webhook and send templated email.
