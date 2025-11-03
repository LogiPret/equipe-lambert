# Contact Form Migration: Supabase to Gmail

## Summary of Changes

The contact form has been migrated from saving to Supabase database to sending emails via Gmail.

## Files Modified

### 1. `/src/app/(frontend)/api/contact-form/route.ts`

- **Changed:** Removed Supabase imports and logic
- **Added:** Email sending functionality using the new email utility
- **Behavior:**
  - Default: Sends form submissions via email
  - Optional: Still supports n8n webhooks if configured
  - Removed: Supabase database insertion

### 2. `/src/lib/email.ts` (NEW)

- **Purpose:** Email utility for sending contact form submissions
- **Features:**
  - Gmail SMTP configuration using nodemailer
  - HTML and text email formatting
  - Automatic field name formatting (camelCase → Title Case)
  - Reply-To support (uses sender's email)
  - French Canadian date formatting

### 3. `/.env.example`

- **Added:** Gmail configuration variables:
  - `GMAIL_USER`
  - `GMAIL_APP_PASSWORD`
  - `CONTACT_FORM_RECIPIENT_EMAIL`

### 4. `/CONTACT_FORM_SETUP.md` (NEW)

- Complete setup instructions
- Gmail App Password generation guide
- Troubleshooting tips
- Vercel deployment instructions

### 5. `/test-email.js` (NEW)

- Test script to verify email configuration
- Checks environment variables
- Sends a test email

### 6. `/package.json`

- **Added:** `nodemailer` dependency
- **Added:** `@types/nodemailer` dev dependency

## How It Works Now

1. User submits contact form
2. API route receives submission
3. Form data is validated
4. **New:** Form data is sent via email (instead of Supabase)
5. Email is formatted with HTML template
6. Email is sent using Gmail SMTP
7. Success/error response returned

## Email Format

**From:** "Formulaire de Contact" <your-gmail@gmail.com>  
**To:** Configured recipient email  
**Subject:** "Nouveau message de contact: [Name] - [Project Type]"  
**Reply-To:** Sender's email (from form)  
**Body:** HTML formatted with all form fields

Example email content:

```
Nouvelle soumission de formulaire de contact

Prenom: Test
Nom: User
Email: test@example.com
Phone: (514) 123-4567
Type: achat

Origine: Homepage Contact Form
Date: 2025-11-03, 10:00 AM
```

## Required Setup

### 1. Generate Gmail App Password

1. Enable 2-Step Verification in Google Account
2. Generate App Password
3. Copy the 16-character password

### 2. Set Environment Variables

Add to `.env`:

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_FORM_RECIPIENT_EMAIL=recipient@example.com
```

### 3. Deploy to Vercel

Add the same environment variables in Vercel project settings.

## Testing

### Local Testing

```bash
# Test email configuration
node --env-file=.env test-email.js

# Or start dev server and submit form
pnpm dev
```

### Production Testing

1. Deploy to Vercel
2. Submit a test form
3. Check recipient email inbox
4. Check Vercel logs for `[Contact Form API]` messages

## Backwards Compatibility

- **n8n webhook:** Still supported if `destination: 'n8n'` is set
- **Supabase:** No longer supported (removed)
- **Field mapping:** Still works (e.g., `projectType` → `type`)

## Migration Notes

### What Changed

- ✅ Email sending replaces Supabase
- ✅ Still supports n8n webhooks
- ✅ Field name mapping still works
- ✅ Same validation logic
- ❌ No longer saves to database by default

### Data Preservation

If you need to preserve form submissions in a database:

1. **Option A:** Use n8n webhook to process and store
2. **Option B:** Add database logic back alongside email
3. **Option C:** Process emails programmatically (Gmail API)

### Form Configuration in CMS

No changes needed in Payload CMS. The contact form blocks will automatically use email by default.

## Troubleshooting

### Common Issues

**"Email transporter not configured"**

- Check environment variables are set
- Restart development server

**"Authentication failed"**

- Use App Password, not regular password
- Enable 2-Step Verification
- Remove spaces from app password

**Emails not arriving**

- Check spam folder
- Verify recipient email is correct
- Check console logs for errors

## Security Notes

- Never commit `.env` file
- Use App Password, not Gmail password
- App passwords are revocable
- Limit access to environment variables
- Monitor email sending limits (Gmail: 500/day for free accounts)

## Next Steps

1. ✅ Set up Gmail App Password
2. ✅ Configure environment variables
3. ✅ Test locally using test script
4. ✅ Deploy to Vercel
5. ✅ Test in production
6. ✅ Monitor email delivery
7. ⚠️ Consider setting up email alerts/notifications
8. ⚠️ Consider backup solution for form data
