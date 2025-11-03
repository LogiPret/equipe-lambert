/**
 * Simple test script for email configuration (JavaScript version)
 *
 * Usage:
 * 1. Make sure your .env file has GMAIL_USER and GMAIL_APP_PASSWORD set
 * 2. Run: node --env-file=.env test-email-simple.mjs
 */

import nodemailer from 'nodemailer'

console.log('Testing email configuration...\n')

// Check environment variables
console.log('Environment variables:')
console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✓ Set' : '✗ Missing')
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✓ Set' : '✗ Missing')
console.log(
  'CONTACT_FORM_RECIPIENT_EMAIL:',
  process.env.CONTACT_FORM_RECIPIENT_EMAIL || '(using GMAIL_USER as default)',
)
console.log('')

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.error('❌ Missing required environment variables!')
  console.error('Please set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file')
  process.exit(1)
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Test data
const testFormData = {
  prenom: 'Test',
  nom: 'User',
  email: 'test@example.com',
  phone: '(514) 123-4567',
  type: 'achat',
}

const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.GMAIL_USER

console.log('Sending test email with data:')
console.log(JSON.stringify(testFormData, null, 2))
console.log('\nRecipient (site owner):', recipientEmail)
console.log('Reply-To (form submitter):', testFormData.email)
console.log('')

// Format email
const htmlBody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
      Nouvelle soumission de formulaire de contact
    </h2>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <strong>Prenom:</strong> ${testFormData.prenom}<br>
      <strong>Nom:</strong> ${testFormData.nom}<br>
      <strong>Email:</strong> ${testFormData.email}<br>
      <strong>Phone:</strong> ${testFormData.phone}<br>
      <strong>Type:</strong> ${testFormData.type}<br>
    </div>
    
    <p><strong>Origine:</strong> Test Script</p>
    
    <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
      Ce message a été envoyé depuis le formulaire de contact du site web.<br>
      Date: ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}
    </p>
  </div>
`

try {
  const result = await transporter.sendMail({
    from: `"Formulaire de Contact" <${process.env.GMAIL_USER}>`,
    to: recipientEmail, // Always send TO the site owner
    subject: `Nouveau message de contact: ${testFormData.prenom} ${testFormData.nom} - ${testFormData.type}`,
    html: htmlBody,
    replyTo: testFormData.email, // Reply-To is the form submitter
  })

  console.log('✅ Email sent successfully!')
  console.log('Message ID:', result.messageId)
  console.log('\n📧 Check your inbox at:', recipientEmail)
  console.log('💡 When you reply, it will go to:', testFormData.email)
} catch (error) {
  console.error('❌ Failed to send email:')
  console.error(error.message)
  if (error.code) {
    console.error('Error code:', error.code)
  }
  process.exit(1)
}
