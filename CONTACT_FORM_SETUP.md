# Contact Form Email Setup

The contact form now sends submissions via email using Gmail instead of Supabase.

## Setup Instructions

### 1. Generate a Gmail App Password

Since Gmail no longer allows "less secure apps", you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left navigation
3. Under "How you sign in to Google," enable **2-Step Verification** (if not already enabled)
4. Go back to Security and click on **2-Step Verification**
5. Scroll down and click on **App passwords**
6. Select app: **Mail**
7. Select device: **Other (Custom name)**
8. Enter a name like "Equipe Lambert Contact Form"
9. Click **Generate**
10. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 2. Configure Environment Variables

Add these environment variables to your `.env` file:

```bash
# Gmail Configuration for Contact Form
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  # The app password from step 1
CONTACT_FORM_RECIPIENT_EMAIL=recipient@example.com  # Where to receive submissions
```

**Important Notes:**

- Use the **App Password**, NOT your regular Gmail password
- Remove any spaces from the app password when pasting it
- `CONTACT_FORM_RECIPIENT_EMAIL` is optional - it defaults to `GMAIL_USER` if not set

### 3. Deploy Configuration

For Vercel deployment:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add the three environment variables:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `CONTACT_FORM_RECIPIENT_EMAIL` (optional)
4. Make sure to add them for all environments (Production, Preview, Development)

### 4. Test the Form

After configuration:

1. Submit a test form on your website
2. Check the console logs for `[Contact Form API]` messages
3. Check the recipient email inbox for the form submission

## Email Format

Form submissions will be sent with:

- **From:** "Formulaire de Contact" <your-gmail@gmail.com>
- **To:** The configured recipient email
- **Subject:** "Nouveau message de contact: [Name] - [Project Type]"
- **Reply-To:** The sender's email (if provided)
- **Body:** Formatted HTML email with all form fields

## Troubleshooting

### "Email transporter not configured" Error

- Verify that `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in your environment variables
- Restart your development server after adding environment variables

### "No recipient email configured" Error

- Set `CONTACT_FORM_RECIPIENT_EMAIL` or ensure `GMAIL_USER` is configured

### Authentication Failed

- Double-check that you're using an App Password, not your regular password
- Ensure 2-Step Verification is enabled on your Google Account
- Remove any spaces from the app password

### Emails Not Arriving

- Check your spam folder
- Verify the recipient email is correct
- Check the console logs for error messages
- Ensure the Gmail account is active and not suspended

## Alternative to n8n

The form still supports sending to n8n webhooks. To use n8n instead of email:

1. In Payload CMS, edit your Contact Block
2. Set **Form Destination** to "n8n Webhook"
3. Enter your **n8n Webhook URL**
4. Save and publish

## Migration from Supabase

The contact form no longer sends data to Supabase by default. All form submissions will be sent via email. If you need to keep a database record:

**Option 1:** Use n8n to receive the webhook and store in your database
**Option 2:** Keep the email code and add database insertion back in the API route
**Option 3:** Set up email forwarding rules in Gmail to automatically process submissions
