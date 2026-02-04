import nodemailer from 'nodemailer'

// Create reusable transporter object using Gmail SMTP
export function createEmailTransporter() {
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    console.error('[Email] Missing GMAIL_USER or GMAIL_APP_PASSWORD')
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })
}

// Format form data for email body
export function formatFormDataForEmail(formData: Record<string, any>): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(formData)) {
    if (key === 'created_at') continue

    const formattedKey = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    lines.push(`<strong>${formattedKey}:</strong> ${value}`)
  }

  return lines.join('<br>')
}

// Send contact form email
export async function sendContactFormEmail(formData: Record<string, any>, origin?: string | null) {
  const transporter = createEmailTransporter()

  if (!transporter) {
    throw new Error('Email transporter not configured')
  }

  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.GMAIL_USER

  if (!recipientEmail) {
    throw new Error('No recipient email configured')
  }

  const senderName =
    `${formData.prenom || formData.firstName || ''} ${formData.nom || formData.lastName || ''}`.trim()
  const senderEmail = formData.email || formData.Email || null
  const projectType = formData.type || formData.projectType || 'Ads'

  const subject = `Nouveau message de contact: ${senderName} - ${projectType}`

  const formattedData = formatFormDataForEmail(formData)
  const originInfo = origin ? `<p><strong>Origine:</strong> ${origin}</p>` : ''

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
        Nouvelle soumission de formulaire de contact
      </h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        ${formattedData}
      </div>
      
      ${originInfo}
      
      <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
        Ce message a été envoyé depuis le formulaire de contact du site web.<br>
        Date: ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}
      </p>
    </div>
  `

  const textBody = `
Nouvelle soumission de formulaire de contact

${Object.entries(formData)
  .filter(([key]) => key !== 'created_at')
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

${origin ? `Origine: ${origin}` : ''}

Date: ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}
  `

  try {
    const info = await transporter.sendMail({
      from: `"Formulaire de Contact" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject: subject,
      text: textBody,
      html: htmlBody,
      replyTo: senderEmail || undefined,
    })

    console.log('[Email] Sent:', info.messageId)
    return info
  } catch (error: any) {
    // Log form data for manual resend
    console.error(
      '[Email] FAILED:',
      error?.message,
      '| Data:',
      JSON.stringify(formData),
      '| Origin:',
      origin,
    )
    throw error
  }
}
