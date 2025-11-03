# Contact Form: Email + SMS Implementation Summary

## ✅ What's Been Implemented

Your contact form now sends notifications via **Email (Gmail)** and **SMS (Twilio)** instead of saving to Supabase or n8n.

### Features

- ✅ **Instant form submission** (~200-500ms response)
- ✅ **Email notifications** via Gmail SMTP
- ✅ **SMS notifications** via Twilio (optional)
- ✅ **Async sending** - notifications sent in background
- ✅ **Reply-To support** - replies go directly to form submitter
- ✅ **Formatted emails** - professional HTML emails
- ✅ **Formatted SMS** - concise text messages
- ✅ **Error handling** - graceful failures (user still gets success)
- ✅ **n8n fallback** - still supports n8n webhooks if configured

## 📁 Files Created/Modified

### New Files

1. `/src/lib/email.ts` - Email sending utility (Gmail SMTP)
2. `/src/lib/sms.ts` - SMS sending utility (Twilio)
3. `/CONTACT_FORM_SETUP.md` - Email setup guide
4. `/TWILIO_SMS_SETUP.md` - SMS setup guide
5. `/QUICK_START_EMAIL.md` - Quick reference
6. `/MIGRATION_NOTES.md` - Technical migration details
7. `/EMAIL_PERFORMANCE.md` - Performance optimizations
8. `/GMAIL_SMTP_TROUBLESHOOTING.md` - Email troubleshooting
9. `/test-email-simple.mjs` - Email testing script

### Modified Files

1. `/src/app/(frontend)/api/contact-form/route.ts` - Now sends email + SMS
2. `/.env.example` - Added Gmail and Twilio variables
3. `/package.json` - Added nodemailer and twilio dependencies

## 🔧 Configuration Required

### Email (Required)

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
CONTACT_FORM_RECIPIENT_EMAIL=recipient@example.com
```

### SMS (Optional)

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=+15551234567
SMS_RECIPIENT_PHONE_NUMBER=+15551234567
```

## 📋 How It Works

### Flow

1. User submits form → **Instant success response** (200-500ms)
2. **Background tasks start:**
   - Email sending (Gmail SMTP)
   - SMS sending (Twilio API)
3. Site owner receives notifications
4. Reply to email → goes directly to form submitter

### Email Content

```
Subject: Nouveau message de contact: [Name] - [Type]
From: "Formulaire de Contact" <your-gmail@gmail.com>
To: recipient@example.com
Reply-To: submitter@example.com

[Formatted HTML email with all form fields]
```

### SMS Content

```
Nouveau contact:

Nom: John Doe
Email: john@example.com
Tel: (514) 123-4567
Type: achat
```

## 🚀 Setup Steps

### For Email

1. Generate Gmail App Password (5 min)
2. Add to `.env` file
3. Test locally
4. Deploy to Vercel

**Guide:** See [QUICK_START_EMAIL.md](./QUICK_START_EMAIL.md)

### For SMS (Optional)

1. Create Twilio account (10 min)
2. Get phone number + credentials
3. Verify recipient number (if trial)
4. Add to `.env` file
5. Test locally
6. Deploy to Vercel

**Guide:** See [TWILIO_SMS_SETUP.md](./TWILIO_SMS_SETUP.md)

## 📊 Performance

- **Before:** 11+ seconds (waiting for email)
- **After:** ~200-500ms (instant response)
- **Email delivery:** 5-15 seconds (background)
- **SMS delivery:** 1-5 seconds (background)

## 💰 Cost

### Email (Gmail)

- **Free tier:** 500 emails/day
- **Cost:** $0

### SMS (Twilio)

- **Free trial:** $15 credit (~500 SMS)
- **Paid:** ~$0.0075 per SMS in US/Canada
- **Monthly:** $1 per phone number
- **Estimate:** 100 submissions/month = ~$1-2/month

## 🔍 Monitoring

Check console logs for:

```bash
# Success
[Contact Form API] Email and SMS queued for sending
[Contact Form API] Email sent successfully: <message-id>
[Contact Form API] SMS sent successfully: SMxxxxxxxxx

# Failures (user still gets success!)
[Contact Form API] Email sending failed: [error]
[Contact Form API] SMS sending failed: [error]
```

## ⚠️ Important Notes

### Email Always Sent TO Site Owner

- Email is sent TO `CONTACT_FORM_RECIPIENT_EMAIL` (site owner)
- Form submitter's email is in `Reply-To` header
- When you reply, it goes directly to the form submitter ✅

### SMS Always Sent TO Site Owner

- SMS is sent TO `SMS_RECIPIENT_PHONE_NUMBER` (site owner)
- Contains form submitter's contact info
- You manually contact the submitter from there

### Async Behavior

- User gets instant success (doesn't wait)
- Email/SMS sent in background
- Failures are logged but don't affect user experience
- Monitor logs to ensure delivery

### SMS Optional

If Twilio is not configured:

- Email still works ✅
- SMS fails silently (logged in console)
- User experience unchanged

## 🔄 Migration from Supabase/n8n

### What Changed

- ❌ No longer saves to Supabase database
- ❌ No longer sends to n8n by default
- ✅ Sends email notifications
- ✅ Sends SMS notifications (optional)
- ✅ Still supports n8n if explicitly configured

### n8n Fallback

To use n8n instead of email+SMS:

1. In Payload CMS, edit Contact Block
2. Set **Form Destination** to "n8n Webhook"
3. Enter your n8n Webhook URL

### Data Preservation

If you need to keep form data:

- Use n8n webhook to capture and store
- Or add database logic back alongside email/SMS

## 📚 Documentation

| Document                                                         | Purpose                  |
| ---------------------------------------------------------------- | ------------------------ |
| [QUICK_START_EMAIL.md](./QUICK_START_EMAIL.md)                   | Quick setup guide        |
| [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md)                 | Detailed email setup     |
| [TWILIO_SMS_SETUP.md](./TWILIO_SMS_SETUP.md)                     | Detailed SMS setup       |
| [EMAIL_PERFORMANCE.md](./EMAIL_PERFORMANCE.md)                   | Performance details      |
| [GMAIL_SMTP_TROUBLESHOOTING.md](./GMAIL_SMTP_TROUBLESHOOTING.md) | Email troubleshooting    |
| [MIGRATION_NOTES.md](./MIGRATION_NOTES.md)                       | Technical migration info |

## 🧪 Testing

### Test Email

```bash
node --env-file=.env test-email-simple.mjs
```

### Test SMS

Create `/test-sms.mjs` (see TWILIO_SMS_SETUP.md)

### Test Form

1. Start dev: `pnpm dev`
2. Submit form on website
3. Check email inbox
4. Check phone for SMS
5. Check console logs

## ✅ Checklist

### Email Setup

- [ ] Generated Gmail App Password
- [ ] Added email env vars to `.env`
- [ ] Tested email locally
- [ ] Added email env vars to Vercel
- [ ] Tested email in production
- [ ] Verified Reply-To works

### SMS Setup (Optional)

- [ ] Created Twilio account
- [ ] Purchased phone number
- [ ] Got Account SID and Auth Token
- [ ] Verified recipient phone (if trial)
- [ ] Added SMS env vars to `.env`
- [ ] Tested SMS locally
- [ ] Added SMS env vars to Vercel
- [ ] Tested SMS in production

### Deployment

- [ ] All env vars in Vercel
- [ ] Deployed to production
- [ ] Tested form submission
- [ ] Monitoring logs
- [ ] Documented for team

## 🎉 You're Done!

Your contact form now sends instant email and SMS notifications!

Need help? Check the documentation files listed above.
