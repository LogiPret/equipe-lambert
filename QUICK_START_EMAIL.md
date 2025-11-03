# Quick Start: Email & SMS Setup for Contact Form

## 📧 Email Setup

### 1️⃣ Get Gmail App Password (5 minutes)

1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification" (if not enabled)
3. Click "2-Step Verification" → scroll to "App passwords"
4. Create new app password:
   - App: Mail
   - Device: Other → "Equipe Lambert"
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2️⃣ Update .env File

```bash
# Add these to your .env file
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop  # Remove spaces!
CONTACT_FORM_RECIPIENT_EMAIL=recipient@example.com
```

## 📱 SMS Setup (Optional)

### 1️⃣ Create Twilio Account (10 minutes)

1. Go to https://www.twilio.com/try-twilio
2. Sign up (get $15 free credit)
3. Buy a phone number with SMS capability
4. Get your credentials from console:
   - Account SID (starts with AC...)
   - Auth Token

### 2️⃣ Add to .env File

```bash
# Add these to your .env file
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=+15551234567  # Your Twilio number
SMS_RECIPIENT_PHONE_NUMBER=+15551234567  # Your phone
```

**Note:** Phone numbers must be in E.164 format (+15551234567)

**Trial accounts:** Must verify recipient phone number first! See [TWILIO_SMS_SETUP.md](./TWILIO_SMS_SETUP.md) for details.

## 3️⃣ Test It

```bash
# Quick test (doesn't require TypeScript)
node --env-file=.env test-email-simple.mjs

# Or start dev server and submit a form
pnpm dev
```

**Note:** The email and SMS will be sent TO the recipient (site owner), with the form submitter's email in Reply-To. This way, when you reply to the notification, it goes directly to the person who filled out the form.

## 4️⃣ Deploy to Vercel

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add all environment variables:
   - **Email:** 3 variables (GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_FORM_RECIPIENT_EMAIL)
   - **SMS:** 4 variables (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, SMS_RECIPIENT_PHONE_NUMBER)
3. Select all environments (Production, Preview, Development)
4. Redeploy your site

## ✅ Done!

Your contact form now sends:

- ✅ Email notifications (Gmail)
- ✅ SMS notifications (Twilio) - if configured

Both send instantly from the user's perspective!

---

**Troubleshooting?**

- Email: See [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md)
- SMS: See [TWILIO_SMS_SETUP.md](./TWILIO_SMS_SETUP.md)
