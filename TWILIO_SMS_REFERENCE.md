# Twilio SMS Integration Reference

This document provides a complete reference for implementing Twilio SMS notifications when a form is submitted, specifically for sending an SMS to a user once they complete a PDF popup form.

---

## Overview

The implementation sends an SMS to the user who fills out a form (e.g., to receive a PDF link). It uses:

- **Twilio Node.js SDK** for sending SMS
- **Next.js API Route** to handle form submissions
- **Environment variables** for credentials

---

## Environment Variables

Add these to your `.env` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   # Your Account SID (starts with AC)
TWILIO_AUTH_TOKEN=your-auth-token-here               # Your Auth Token
TWILIO_PHONE_NUMBER=+14386075709                     # Your Twilio phone number (E.164 format)

# Optional: For sending notifications TO a specific recipient (admin alerts)
SMS_RECIPIENT_PHONE_NUMBER=+15551234567              # Admin phone number
```

**Phone Number Format (E.164):**

- US/Canada: `+15551234567`
- France: `+33612345678`
- UK: `+447911123456`

---

## Installation

```bash
npm install twilio
# or
pnpm add twilio
```

---

## Implementation

### 1. SMS Utility Module (`src/lib/sms.ts`)

```typescript
import twilio from 'twilio'

// Create Twilio client
export function createTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    console.error(
      'Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables.',
    )
    return null
  }

  return twilio(accountSid, authToken)
}

// Send SMS to popup form submitter with PDF link
export async function sendPopupFormSMS(recipientPhone: string) {
  const client = createTwilioClient()

  if (!client) {
    throw new Error('Twilio client not configured')
  }

  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!fromNumber) {
    throw new Error(
      'No Twilio phone number configured. Please set TWILIO_PHONE_NUMBER environment variable.',
    )
  }

  // SMS message with PDF link
  const smsBody = `Salut! C'est David Lambert. Voici le PDF dont je parle dans la vidéo. Bonne lecture! https://equipelambert.ca/pdf/guide-immobilier`

  // Send SMS to the person who filled the form
  const message = await client.messages.create({
    body: smsBody,
    from: fromNumber,
    to: recipientPhone,
  })

  console.log('Popup SMS sent successfully to submitter:', message.sid)
  return message
}

// Format form data for SMS body (for admin notifications)
export function formatFormDataForSMS(formData: Record<string, any>): string {
  const lines: string[] = []

  // Add key fields
  const name =
    `${formData.prenom || formData.firstName || ''} ${formData.nom || formData.lastName || ''}`.trim()
  if (name) lines.push(`Nom: ${name}`)

  if (formData.email) lines.push(`Email: ${formData.email}`)
  if (formData.phone) lines.push(`Tel: ${formData.phone}`)

  const projectType = formData.type || formData.projectType
  if (projectType) lines.push(`Type: ${projectType}`)

  // Add any other fields (excluding internal ones)
  for (const [key, value] of Object.entries(formData)) {
    if (
      ![
        'prenom',
        'nom',
        'firstName',
        'lastName',
        'email',
        'phone',
        'type',
        'projectType',
        'created_at',
      ].includes(key)
    ) {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      lines.push(`${formattedKey}: ${value}`)
    }
  }

  return lines.join('\n')
}

// Send SMS notification to admin
export async function sendContactFormSMS(formData: Record<string, any>, origin?: string | null) {
  const client = createTwilioClient()

  if (!client) {
    throw new Error('Twilio client not configured')
  }

  const fromNumber = process.env.TWILIO_PHONE_NUMBER
  const toNumber = process.env.SMS_RECIPIENT_PHONE_NUMBER

  if (!fromNumber) {
    throw new Error(
      'No Twilio phone number configured. Please set TWILIO_PHONE_NUMBER environment variable.',
    )
  }

  if (!toNumber) {
    throw new Error(
      'No recipient phone number configured. Please set SMS_RECIPIENT_PHONE_NUMBER environment variable.',
    )
  }

  // Build SMS body (SMS has 160 character limit per segment)
  const formattedData = formatFormDataForSMS(formData)
  const originInfo = origin ? `\nOrigine: ${origin}` : ''

  const smsBody = `Nouveau contact:\n\n${formattedData}${originInfo}`

  // Send SMS
  const message = await client.messages.create({
    body: smsBody,
    from: fromNumber,
    to: toNumber,
  })

  console.log('SMS sent successfully:', message.sid)
  return message
}
```

---

### 2. API Route (`src/app/api/popup-form/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sendPopupFormSMS } from '@/lib/sms'
// Optional: import { sendContactFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[Popup Form API] Received body:', JSON.stringify(body, null, 2))

    // Support both direct object payloads and FormBuilder-like { submissionData: [] }
    let formData: any = {}

    if (body && body.submissionData && Array.isArray(body.submissionData)) {
      // Handle FormBuilder format
      body.submissionData.forEach((field: any) => {
        const fieldName = field.field || field.name
        const fieldValue = field.value

        if (fieldName && fieldValue !== undefined) {
          formData[fieldName] = fieldValue
        }
      })
    } else if (body && typeof body === 'object') {
      // Handle direct object format
      formData = body
    } else {
      console.error('[Popup Form API] Invalid form data format received:', body)
      return NextResponse.json(
        { error: 'Invalid form data', details: 'Expected object or submissionData[]' },
        { status: 400 },
      )
    }

    console.log('[Popup Form API] Parsed form data:', formData)

    // Extract phone field (adapt field names to your form)
    const phone = formData.phone || formData.telephone || ''

    // Validate required fields
    if (!phone) {
      console.error('[Popup Form API] Missing required phone number')
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Send SMS to user
    console.log('[Popup Form API] Sending SMS to user:', phone)

    try {
      const smsResult = await sendPopupFormSMS(phone)
      console.log('[Popup Form API] SMS sent successfully:', smsResult.sid)
    } catch (smsError) {
      console.error('[Popup Form API] SMS sending failed:', smsError)
      // Decide whether to fail the request or continue
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Merci! Vous allez recevoir le PDF par SMS dans quelques instants.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[Popup Form API] Error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
```

---

### 3. Frontend Form Component (Example)

```tsx
'use client'

import { useState } from 'react'

export function PopupForm() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/popup-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          // Add other fields as needed
          firstname: 'John',
          lastname: 'Doe',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        console.error('Form submission failed:', data)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <p>Merci! Vous allez recevoir le PDF par SMS dans quelques instants.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Votre numéro de téléphone"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Recevoir le PDF'}
      </button>
    </form>
  )
}
```

---

## File Structure

```
src/
├── lib/
│   └── sms.ts                      # Twilio SMS utility functions
└── app/
    └── api/
        └── popup-form/
            └── route.ts            # API route handling form submissions
```

---

## Twilio Account Setup

1. **Create Account**: https://www.twilio.com/try-twilio
2. **Get a Phone Number**:
   - Console > Phone Numbers > Buy a number
   - Enable SMS capability
3. **Get Credentials**:
   - Account SID (starts with `AC`)
   - Auth Token
4. **Verify Recipients (Trial Only)**:
   - Console > Phone Numbers > Verified Caller IDs
   - Add numbers that can receive SMS during trial

---

## Testing

### Test Script (`test-sms.mjs`)

```javascript
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER
const toNumber = '+15551234567' // Replace with test number

const client = twilio(accountSid, authToken)

console.log('Sending test SMS...')

try {
  const message = await client.messages.create({
    body: 'Test SMS from your app!',
    from: fromNumber,
    to: toNumber,
  })
  console.log('SMS sent successfully! SID:', message.sid)
} catch (error) {
  console.error('Failed to send SMS:', error.message)
}
```

Run with:

```bash
node --env-file=.env test-sms.mjs
```

---

## Troubleshooting

| Error                         | Solution                                                        |
| ----------------------------- | --------------------------------------------------------------- |
| "The number is unverified"    | Verify recipient number in Twilio console (trial accounts only) |
| "Invalid 'From' phone number" | Ensure `TWILIO_PHONE_NUMBER` is a number you own in Twilio      |
| No SMS received               | Check Twilio logs at console.twilio.com, verify E.164 format    |
| Credentials error             | Double-check Account SID and Auth Token                         |

---

## Cost

- **Trial**: $15 free credit (~500 SMS to US/Canada)
- **Paid**: ~$0.0075/SMS (US/Canada), $1/month per phone number

---

## Deployment (Vercel)

Add environment variables in Vercel Dashboard:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

---

## Links

- Twilio Console: https://console.twilio.com/
- SMS Documentation: https://www.twilio.com/docs/sms
- Node.js SDK: https://www.twilio.com/docs/libraries/node
