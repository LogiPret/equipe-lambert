import React from 'react'

// This component renders in the Payload Admin header and on the Login page
// Update the src to any asset in /public
const AdminLogo: React.FC = () => {
  const isLogin =
    typeof window !== 'undefined' && /\/admin\/login\/?$/.test(window.location.pathname)
  const height = isLogin ? 84 : 28 // 3x bigger on login page
  return (
    <img
      src="/logipret_logo_transparent.png"
      alt="Équipe Lambert"
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  )
}

export default AdminLogo
