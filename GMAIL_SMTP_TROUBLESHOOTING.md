# Gmail SMTP Connection Troubleshooting

## Common Error: "Greeting never received" / ETIMEDOUT

This error means the connection to Gmail's SMTP server timed out.

### Possible Causes & Solutions

### 1. ✅ **App Password Issues**

**Check:**

- Are you using an App Password (not your regular Gmail password)?
- Is 2-Step Verification enabled?
- Is the App Password correct (no spaces)?

**Fix:**

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Generate a new App Password
4. Update `.env` file with the new password (remove spaces!)

### 2. 🔥 **Firewall/Network Blocking**

Gmail SMTP uses port 587 (STARTTLS). Some networks/firewalls block this.

**Check:**

```bash
# Test if port 587 is accessible
nc -zv smtp.gmail.com 587
# OR
telnet smtp.gmail.com 587
```

**Fix:**

- Use a different network (mobile hotspot, different WiFi)
- Contact your network administrator
- Check if your hosting provider blocks outbound SMTP
- Try port 465 (SSL) instead of 587

### 3. ⚠️ **Gmail Rate Limiting**

Gmail may temporarily block connections if you send too many emails too quickly.

**Check:**

- Have you sent many emails recently?
- Are you testing repeatedly?

**Fix:**

- Wait 10-30 minutes
- Reduce email sending frequency
- Use Gmail's API instead of SMTP for higher limits

### 4. 🌍 **Vercel/Hosting Provider Issues**

Some hosting providers (including Vercel) may have issues with SMTP connections.

**Check:**

- Does it work locally but not on Vercel?
- Check Vercel logs for network errors

**Fix:**

- **Use Vercel's recommended email services:**
  - Resend (https://resend.com) - Recommended by Vercel
  - SendGrid
  - AWS SES
  - Postmark

### 5. 🔐 **Gmail Security Blocks**

Gmail may block connections from unfamiliar locations or IPs.

**Check:**

- Check your Gmail inbox for security alerts
- Check: https://myaccount.google.com/notifications

**Fix:**

- Click "Yes, it was me" on any security alerts
- Add your server IP to trusted locations
- Use Gmail API with OAuth2 instead of SMTP

## Quick Fixes to Try

### Fix 1: Increase Timeouts

Already implemented in the code:

- Connection timeout: 10 seconds
- Greeting timeout: 10 seconds
- Socket timeout: 15 seconds

### Fix 2: Use Port 465 (SSL) Instead of 587

Edit `/src/lib/email.ts`:

```typescript
cachedTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Change from 587
  secure: true, // Change from false
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
  // ... rest of config
})
```

### Fix 3: Disable Connection Pooling

Edit `/src/lib/email.ts`:

```typescript
cachedTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
  pool: false, // Disable pooling
  // Remove maxConnections, maxMessages
})
```

### Fix 4: Test Connection

Add this to test if connection works:

```typescript
// In your email.ts
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection failed:', error)
  } else {
    console.log('SMTP server is ready to send emails')
  }
})
```

## Recommended: Switch to Resend

For production, consider using Resend instead of Gmail SMTP:

### Why Resend?

- ✅ Faster (< 500ms)
- ✅ More reliable
- ✅ No connection timeouts
- ✅ Better delivery rates
- ✅ Easier to set up
- ✅ Free tier: 100 emails/day

### Setup Resend (5 minutes)

1. **Sign up:** https://resend.com
2. **Get API key:** From dashboard
3. **Install package:**

   ```bash
   pnpm add resend
   ```

4. **Update `.env`:**

   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

5. **Update `/src/lib/email.ts`:**

   ```typescript
   import { Resend } from 'resend'

   const resend = new Resend(process.env.RESEND_API_KEY)

   export async function sendContactFormEmail(formData, origin) {
     await resend.emails.send({
       from: 'contact@yourdomain.com',
       to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
       subject: `Nouveau message de contact: ${formData.prenom} ${formData.nom}`,
       html: htmlBody,
       replyTo: formData.email,
     })
   }
   ```

## Testing Checklist

- [ ] App Password is correct (no spaces)
- [ ] 2-Step Verification is enabled
- [ ] Port 587 is not blocked (`nc -zv smtp.gmail.com 587`)
- [ ] No recent Gmail security alerts
- [ ] Not hitting Gmail rate limits
- [ ] Works locally (if not, network issue)
- [ ] Environment variables are set in Vercel

## Current Implementation

The code now includes:

- ✅ Retry logic (2 retries with backoff)
- ✅ Connection timeout handling
- ✅ Transporter cache clearing on errors
- ✅ Detailed error logging
- ✅ Async sending (user doesn't wait)

## Still Having Issues?

1. **Check Vercel logs** for detailed errors
2. **Try port 465** instead of 587
3. **Switch to Resend** (recommended for production)
4. **Contact your hosting support** about SMTP restrictions

## Environment-Specific Notes

### Local Development

- Usually works fine
- Make sure `.env` file is loaded

### Vercel/Production

- May have SMTP restrictions
- Consider using Resend/SendGrid
- Check for firewall/network blocks
- Ensure environment variables are set correctly
