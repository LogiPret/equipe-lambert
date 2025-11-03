import nodemailer from 'nodemailer'

// Create reusable transporter object using Gmail SMTP
export function createEmailTransporter() {
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    console.error(
      'Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.',
    )
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
    // Skip internal fields
    if (key === 'created_at') continue

    // Format the key to be more readable
    const formattedKey = key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
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

  // Site owner's email - where form submissions are sent TO
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.GMAIL_USER

  if (!recipientEmail) {
    throw new Error(
      'No recipient email configured. Please set CONTACT_FORM_RECIPIENT_EMAIL environment variable.',
    )
  }

  // Extract form submitter info for subject line and Reply-To
  const senderName =
    `${formData.prenom || formData.firstName || ''} ${formData.nom || formData.lastName || ''}`.trim()
  const senderEmail = formData.email || formData.Email || null
  const projectType = formData.type || formData.projectType || 'Ads'

  // Build email subject
  const subject = `Nouveau message de contact: ${senderName} - ${projectType}`

  // Build email body
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

  // Send email TO site owner, with form submitter's email in Reply-To
  const info = await transporter.sendMail({
    from: `"Formulaire de Contact" <${process.env.GMAIL_USER}>`,
    to: recipientEmail, // Always send TO the site owner
    subject: subject,
    text: textBody,
    html: htmlBody,
    replyTo: senderEmail || undefined, // Reply-To is the form submitter (if provided)
  })

  console.log('Email sent successfully:', info.messageId)
  return info
}
