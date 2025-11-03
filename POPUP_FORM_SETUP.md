# Popup Form Setup Documentation

## Overview

The popup form modal has **special behavior** different from the main contact form:

- **SMS** is sent TO the form submitter (with PDF link)
- **Email** is sent TO the site owner (lead notification in French)

## Form Flow

### 1. User Interaction

- User fills popup form with: `firstname`, `lastname`, `phone`, `email`
- User submits form
- User receives instant success response (200-500ms)

### 2. SMS to Form Submitter

**Recipient:** The phone number provided in the form (`formData.phone`)

**Message:**

```
Salut! C'est David Lambert 👋 Voici le PDF dont je parle dans la vidéo. Bonne lecture! https://equipelambert.ca/pdf/guide-immobilier
```

**Purpose:** Deliver PDF guide immediately to the person who filled the form

### 3. Email to Site Owner

**Recipient:** `CONTACT_FORM_RECIPIENT_EMAIL` (site owner)

**Subject:** "Nouveau lead - Publicité Facebook"

**Content:** Contains form submitter's information:

- First name
- Last name
- Email
- Phone

**Purpose:** Notify site owner of new lead from Facebook ads

## Technical Implementation

### API Endpoint

```
POST /api/popup-form
```

### Code Location

- **Route:** `/src/app/(frontend)/api/popup-form/route.ts`
- **SMS Utility:** `/src/lib/sms.ts` - `sendPopupFormSMS()`
- **Email Utility:** `/src/lib/email.ts` - `sendContactFormEmail()`

### Async Processing

Both SMS and email are sent asynchronously (fire-and-forget pattern):

- User receives instant 200 response
- Notifications sent in background
- Failures are logged but don't block user experience

## Environment Variables Required

```bash
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Gmail Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
CONTACT_FORM_RECIPIENT_EMAIL=owner@example.com
```

## Difference from Main Contact Form

| Feature         | Main Contact Form               | Popup Form                          |
| --------------- | ------------------------------- | ----------------------------------- |
| SMS Recipient   | None (no SMS sent)              | Form submitter (formData.phone)     |
| SMS Message     | N/A                             | PDF link message                    |
| Email Recipient | Site owner                      | Site owner                          |
| Email Subject   | "Nouveau formulaire de contact" | "Nouveau lead - Publicité Facebook" |
| Reply-To        | Form submitter                  | Form submitter                      |

## Testing

### Test SMS to Submitter

1. Fill popup form with your phone number
2. Submit form
3. Check your phone for SMS with PDF link

### Test Email to Owner

1. Fill popup form with any data
2. Submit form
3. Check `CONTACT_FORM_RECIPIENT_EMAIL` inbox for lead notification

### Verify Async Behavior

1. Submit form
2. Check browser network tab - should receive 200 response in ~200-500ms
3. Check server logs for SMS/email sending completion

## Error Handling

### SMS Failures

- Errors are logged to console: `[Popup Form API] SMS sending failed:`
- User still sees success message
- Check Twilio dashboard for delivery status

### Email Failures

- Errors are logged to console: `[Popup Form API] Lead notification email failed:`
- User still sees success message
- Check Gmail account for bounce notifications

### Validation Errors

- If phone number is missing: 400 error returned
- Invalid data format: 400 error returned
- These are synchronous and block user

## Success Response

```json
{
  "success": true,
  "message": "Merci! Vous allez recevoir le PDF par SMS dans quelques instants."
}
```

## Logs to Monitor

```
[Popup Form API] Received body: {...}
[Popup Form API] Parsed form data: {...}
[Popup Form API] Sending SMS to user: +1234567890
[Popup Form API] Sending lead notification email to site owner
[Popup Form API] Popup form processed successfully
[Popup Form API] SMS sent to user successfully: SM...
[Popup Form API] Lead notification email sent: <message-id>
```

## Troubleshooting

### SMS not received by submitter

1. Verify phone number format (should include country code)
2. Check Twilio dashboard for delivery status
3. Verify `TWILIO_PHONE_NUMBER` is active
4. Check server logs for SMS errors

### Owner not receiving email notification

1. Verify `CONTACT_FORM_RECIPIENT_EMAIL` is correct
2. Check spam folder
3. Verify Gmail credentials in environment variables
4. Check server logs for email errors

### Slow form submission

- Verify async pattern is working (should be ~200-500ms)
- Check server logs for blocking operations
- Both SMS and email should be fire-and-forget

## Future Enhancements

- Add SMS delivery confirmation
- Track lead source in email
- Add fallback if SMS fails (send email to submitter)
- Rate limiting to prevent abuse
