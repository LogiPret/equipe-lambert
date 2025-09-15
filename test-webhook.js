// Test script to verify n8n webhook
const testWebhook = async () => {
  const testData = {
    firstname: 'Test',
    lastname: 'User',
    phone: '(514) 123-4567',
    email: 'test@example.com',
    budget: 500000,
    when_interested: 'Dans 3-6 mois',
    type_property: 'Condo',
    area_wanted: 'Montreal',
  }

  try {
    const response = await fetch('https://n8n-wwfb.onrender.com/webhook/equipe-lambert/meta-ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    console.log('Status:', response.status)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('Response:', responseText)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run test
testWebhook()
