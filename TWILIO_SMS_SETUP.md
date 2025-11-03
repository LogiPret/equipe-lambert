# Twilio SMS Setup Guide

This guide explains how to set up Twilio SMS notifications for contact form submissions.

## Prerequisites

- A Twilio account (free trial available)
- A phone number capable of receiving SMS

## Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your email and phone number
4. You'll get $15 in free credit for testing

## Step 2: Get a Twilio Phone Number

1. Log in to https://console.twilio.com/
2. Go to **Phone Numbers** → **Manage** → **Buy a number**
3. Select your country (e.g., United States, Canada)
4. Check **SMS** capability
5. Search for available numbers
6. Purchase a number (uses your free credit)
7. Save this number - you'll need it later

**Note:** The phone number must be in E.164 format: `+15551234567` (include country code and `+`)

## Step 3: Get Your API Credentials

1. Go to https://console.twilio.com/
2. On the dashboard, find:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click to reveal)
3. Copy both values

## Step 4: Verify Your Recipient Phone Number (Trial Only)

**If using a free trial account**, you must verify the recipient phone number:

1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/verified
2. Click **Add a new Caller ID**
3. Enter the phone number that will receive SMS notifications
4. Follow the verification process (you'll receive a code via SMS)
5. Enter the code to verify

**Note:** Verified accounts can skip this step and send to any number.

## Step 5: Configure Environment Variables

Add these to your `.env` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # From Step 3
TWILIO_AUTH_TOKEN=your-auth-token-here              # From Step 3
TWILIO_PHONE_NUMBER=+15551234567                    # From Step 2 (your Twilio number)
SMS_RECIPIENT_PHONE_NUMBER=+15551234567             # Your phone number (verified in Step 4)
```

**Important:**

- All phone numbers must be in E.164 format: `+[country code][number]`
- Examples:
  - US/Canada: `+15551234567`
  - France: `+33612345678`
  - UK: `+447911123456`

## Step 6: Test SMS Functionality

### Option 1: Use Test Script

Create a simple test file:

```javascript
// test-sms.mjs
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER
const toNumber = process.env.SMS_RECIPIENT_PHONE_NUMBER

const client = twilio(accountSid, authToken)

console.log('Sending test SMS...')
console.log('From:', fromNumber)
console.log('To:', toNumber)

try {
  const message = await client.messages.create({
    body: 'Test SMS from contact form! 🎉',
    from: fromNumber,
    to: toNumber,
  })
  console.log('✅ SMS sent successfully!')
  console.log('Message SID:', message.sid)
} catch (error) {
  console.error('❌ Failed to send SMS:', error.message)
}
```

Run it:

```bash
node --env-file=.env test-sms.mjs
```

### Option 2: Submit Contact Form

1. Start your dev server: `pnpm dev`
2. Submit a contact form on your site
3. Check your phone for the SMS notification
4. Check console logs for SMS status

## Step 7: Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the 4 Twilio variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
   - `SMS_RECIPIENT_PHONE_NUMBER`
4. Select environments (Production, Preview, Development)
5. Redeploy your site

## SMS Format

When a form is submitted, you'll receive an SMS like:

```
Nouveau contact:

Nom: John Doe
Email: john@example.com
Tel: (514) 123-4567
Type: achat
```

## Cost Information

### Free Trial

- $15 credit
- ~500 SMS messages (varies by country)
- Can only send to verified numbers

### Paid Account

- ~$0.0075 per SMS in US/Canada
- ~$0.10 per SMS in other countries
- $1/month per phone number
- Can send to any number

**Estimate:** If you receive 100 form submissions/month = ~$1-2/month

## Troubleshooting

### Error: "The number +1234567890 is unverified"

**Solution:** Verify the recipient number (Step 4) or upgrade to paid account

### Error: "Account not authorized to call +1234567890"

**Solution:**

- Check that phone numbers are in E.164 format
- Verify the recipient number if on trial
- Check Twilio console for account restrictions

### Error: "Unable to create record: The 'From' number +15551234567 is not a valid phone number"

**Solution:**

- Make sure `TWILIO_PHONE_NUMBER` is a number you own in Twilio
- Check it's in E.164 format (+15551234567)
- Verify it's SMS-enabled in Twilio console

### No SMS Received

**Check:**

1. Phone number format (E.164)
2. Recipient number is verified (if trial)
3. Twilio account has credit
4. Check Twilio logs: https://console.twilio.com/us1/monitor/logs/sms
5. Check your phone's spam folder
6. Check console logs for errors

### SMS Not Sending (No Errors)

**Check:**

1. Environment variables are set correctly
2. Restart your dev server after setting env vars
3. Check Twilio dashboard for message logs
4. Verify credentials are correct

## Disabling SMS (Keep Email Only)

If you want to disable SMS notifications:

### Option 1: Don't Set Twilio Env Vars

Simply don't set the Twilio environment variables. The system will:

- Send email notifications ✅
- Skip SMS (silently fail) ⚠️
- Log warning in console

### Option 2: Comment Out SMS Code

In `/src/app/(frontend)/api/contact-form/route.ts`:

```typescript
// Send email asynchronously
sendContactFormEmail(dynamicPayload, origin)
  .then(...)
  .catch(...)

// Comment out SMS sending:
// sendContactFormSMS(dynamicPayload, origin)
//   .then(...)
//   .catch(...)
```

## Monitoring

Check your server logs for:

```
[Contact Form API] Email and SMS queued for sending
[Contact Form API] Email sent successfully: <message-id>
[Contact Form API] SMS sent successfully: SMxxxxxxxxxxxxxxxxx
```

If SMS fails:

```
[Contact Form API] SMS sending failed: [error details]
```

## Upgrade from Trial

To send SMS to any number (not just verified ones):

1. Go to https://console.twilio.com/billing
2. Add a payment method
3. Upgrade your account
4. You can now send to any number without verification

## Alternative: Use Another SMS Service

If you prefer a different SMS service:

1. **Plivo**: Similar to Twilio, good pricing
2. **Vonage (Nexmo)**: Enterprise-focused
3. **Telnyx**: Competitive pricing
4. **AWS SNS**: If already using AWS

Simply replace the Twilio implementation in `/src/lib/sms.ts` with your preferred provider's API.

## Summary Checklist

- [ ] Created Twilio account
- [ ] Purchased phone number
- [ ] Got Account SID and Auth Token
- [ ] Verified recipient phone number (if trial)
- [ ] Added env variables to `.env`
- [ ] Tested SMS locally
- [ ] Added env variables to Vercel
- [ ] Tested in production
- [ ] Monitoring SMS logs

## Support

- **Twilio Docs**: https://www.twilio.com/docs/sms
- **Console**: https://console.twilio.com/
- **Support**: https://support.twilio.com/
