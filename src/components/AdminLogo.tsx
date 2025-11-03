'use client'

import React, { useEffect, useState } from 'react'

// This component renders in the Payload Admin header and on the Login page
// Update the src to any asset in /public
const AdminLogo: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    // Multiple ways to detect login page
    const checkIsLogin = () => {
      if (typeof window === 'undefined') return false

      // Check URL path
      const isLoginPath = /\/admin\/login\/?$/.test(window.location.pathname)

      // Check if we're in a login form context
      const hasLoginForm = document.querySelector('form[action*="login"]') !== null

      // Check for login-specific elements
      const hasLoginButton = document
        .querySelector('button[type="submit"]')
        ?.textContent?.toLowerCase()
        .includes('login')

      return isLoginPath || hasLoginForm || hasLoginButton || false
    }

    setIsLogin(checkIsLogin())

    // Re-check after a short delay in case DOM isn't fully loaded
    const timeout = setTimeout(() => {
      setIsLogin(checkIsLogin())
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  // Always render the large version with aggressive CSS - let CSS handle the sizing
  return (
    <>
      {isLogin && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .login-logo img {
              height: 108px !important;
              width: auto !important;
              max-width: none !important;
              max-height: none !important;
              min-width: 200px !important;
              transform: scale(1.5) !important;
            }
          `,
          }}
        />
      )}
      <div
        className={isLogin ? 'login-logo' : 'admin-logo'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: isLogin ? '120px' : 'auto',
          padding: isLogin ? '20px 0' : '0',
        }}
      >
        <img
          src="/equipelambert_logo.png"
          alt="Équipe Lambert"
          style={{
            height: isLogin ? '160px' : '28px', // Much larger base size
            width: 'auto',
            display: 'block',
            objectFit: 'contain',
            maxWidth: 'none !important' as any, // Force override
            maxHeight: 'none !important' as any, // Force override
            minWidth: isLogin ? '200px' : 'auto', // Force minimum width
            transform: isLogin ? 'scale(1.5)' : 'none', // Additional scaling
            transformOrigin: 'center',
            // Aggressive CSS overrides
            ...(isLogin && {
              position: 'relative' as const,
              zIndex: 9999,
            }),
          }}
        />
      </div>
    </>
  )
}

export default AdminLogo
