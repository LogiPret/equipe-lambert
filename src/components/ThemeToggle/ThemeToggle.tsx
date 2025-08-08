'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

const themeLocalStorageKey = 'payload-theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)
  const [enabled, setEnabled] = useState(false)

  // Detect preview/admin iframe environment
  useEffect(() => {
    const inIframe = typeof window !== 'undefined' && window.self !== window.top
    const ref = typeof document !== 'undefined' ? document.referrer : ''
    const qs = typeof window !== 'undefined' ? window.location.search : ''
    const previewHint = /preview|live/i.test(qs) || ref.includes('/admin')
    if (inIframe || previewHint) setEnabled(true)
  }, [])

  // Check if component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Get the current theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem(themeLocalStorageKey)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    } else {
      setTheme('system')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === 'system') {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light')
      localStorage.removeItem(themeLocalStorageKey)
    } else {
      // Use explicit theme
      root.setAttribute('data-theme', newTheme)
      localStorage.setItem(themeLocalStorageKey, newTheme)
    }
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  // Don't render until mounted or if not enabled (non-preview environment)
  if (!mounted || !enabled) {
    return null
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      case 'system':
        return <Monitor className="h-5 w-5" />
      default:
        return <Sun className="h-5 w-5" />
    }
  }

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark theme'
      case 'dark':
        return 'Switch to System theme'
      case 'system':
        return 'Switch to Light theme'
      default:
        return 'Toggle theme'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <button
        onClick={toggleTheme}
        className="
          relative
          bg-glass-white-strong
          backdrop-blur-sm
          border border-form-border
          rounded-full
          p-3
          shadow-lg
          hover:shadow-xl
          transition-all
          duration-300
          hover:scale-110
          active:scale-95
          text-text-body
          hover:text-brand-primary
        "
        aria-label={getTooltip()}
        title={getTooltip()}
      >
        {getIcon()}

        {/* Tooltip */}
        <div
          className="
          absolute
          bottom-full
          right-0
          mb-2
          px-3
          py-1.5
          bg-text-heading/90
          text-white
          text-sm
          rounded-lg
          whitespace-nowrap
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-200
          pointer-events-none
          backdrop-blur-sm
        "
        >
          {getTooltip()}

          {/* Tooltip arrow */}
          <div
            className="
            absolute
            top-full
            right-3
            w-0
            h-0
            border-l-4
            border-r-4
            border-t-4
            border-l-transparent
            border-r-transparent
            border-t-text-heading/90
          "
          ></div>
        </div>

        {/* Theme indicator ring */}
        <div
          className={`
          absolute
          inset-0
          rounded-full
          transition-all
          duration-300
          ${theme === 'light' ? 'ring-2 ring-mode-acheter/60' : ''}
          ${theme === 'dark' ? 'ring-2 ring-mode-vendre/60' : ''}
          ${theme === 'system' ? 'ring-2 ring-text-muted/60' : ''}
        `}
        ></div>
      </button>

      {/* Theme status badge */}
      <div
        className="
        absolute
        -top-2
        -left-2
        bg-brand-primary/90
        text-white
        text-xs
        px-2
        py-0.5
        rounded-full
        font-medium
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-200
        pointer-events-none
        backdrop-blur-sm
        capitalize
      "
      >
        {theme}
      </div>
    </div>
  )
}
