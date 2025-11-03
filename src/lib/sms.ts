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

// Format form data for SMS body
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

// Send SMS notification
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
  const smsBody = `Salut! C'est David Lambert 👋 Voici le PDF dont je parle dans la vidéo. Bonne lecture! https://equipelambert.ca/pdf/guide-immobilier`

  // Send SMS to the person who filled the form
  const message = await client.messages.create({
    body: smsBody,
    from: fromNumber,
    to: recipientPhone,
  })

  console.log('Popup SMS sent successfully to submitter:', message.sid)
  return message
}
