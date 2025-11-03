/**
 * Test script for email configuration
 *
 * Usage:
 * 1. Make sure your .env file has GMAIL_USER and GMAIL_APP_PASSWORD set
 * 2. Run: node --env-file=.env --loader tsx/esm test-email.js
 *    OR install tsx globally: npm i -g tsx && tsx --env-file=.env test-email.js
 */

import { sendContactFormEmail } from './src/lib/email.js'

async function testEmail() {
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

  // Test data
  const testFormData = {
    prenom: 'Test',
    nom: 'User',
    email: 'test@example.com',
    phone: '(514) 123-4567',
    type: 'achat',
  }

  const testOrigin = 'Test Script'

  console.log('Sending test email with data:')
  console.log(JSON.stringify(testFormData, null, 2))
  console.log('')

  try {
    const result = await sendContactFormEmail(testFormData, testOrigin)
    console.log('✅ Email sent successfully!')
    console.log('Message ID:', result.messageId)
    console.log(
      '\nCheck your inbox at:',
      process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.GMAIL_USER,
    )
  } catch (error) {
    console.error('❌ Failed to send email:')
    console.error(error.message)
    if (error.code) {
      console.error('Error code:', error.code)
    }
    process.exit(1)
  }
}

testEmail()
