import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        background: 'var(--background)',
        border: 'var(--border)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        primarystatic: {
          DEFAULT: 'var(--primary-static)',
          foreground: 'var(--primary-static)',
        },
        secondarystatic: {
          DEFAULT: 'var(--secondary-static)',
          foreground: 'var(--secondary-static)',
        },
        textprimarystatic: {
          DEFAULT: 'var(--text-primary-static)',
          foreground: 'var(--text-primary-static)',
        },
        textsecondarystatic: {
          DEFAULT: 'var(--text-secondary-static)',
          foreground: 'var(--text-secondary-static)',
        },
        accent1static: {
          DEFAULT: 'var(--accent1-static)',
          foreground: 'var(--accent1-static)',
        },
        accent2static: {
          DEFAULT: 'var(--accent2-static)',
          foreground: 'var(--accent2-static)',
        },
        accent3static: {
          DEFAULT: 'var(--accent3-static)',
          foreground: 'var(--accent3-static)',
        },
        borderprimarystatic: {
          DEFAULT: 'var(--border-primary-static)',
          foreground: 'var(--border-primary-static)',
        },
        bordersecondarystatic: {
          DEFAULT: 'var(--border-secondary-static)',
          foreground: 'var(--border-secondary-static)',
        },
        testcol: {
          DEFAULT: 'var(--test-col)',
          foreground: 'var(--test-col)',
        },
        branding100: {
          DEFAULT: 'var(--branding-100)',
          foreground: 'var(--branding-100)',
        },
        branding90: {
          DEFAULT: 'var(--branding-90)',
          foreground: 'var(--branding-90)',
        },
        branding75: {
          DEFAULT: 'var(--branding-75)',
          foreground: 'var(--branding-75)',
        },
        branding50: {
          DEFAULT: 'var(--branding-50)',
          foreground: 'var(--branding-50)',
        },
        branding25: {
          DEFAULT: 'var(--branding-25)',
          foreground: 'var(--branding-25)',
        },
        branding0: {
          DEFAULT: 'var(--branding-0)',
          foreground: 'var(--branding-0)',
        },
        branding1: {
          DEFAULT: 'var(--branding1)',
          foreground: 'var(--branding1)',
        },
        branding2: {
          DEFAULT: 'var(--branding2)',
          foreground: 'var(--branding2)',
        },
        branding3: {
          DEFAULT: 'var(--branding3)',
          foreground: 'var(--branding3)',
        },
        branding4: {
          DEFAULT: 'var(--branding4)',
          foreground: 'var(--branding4)',
        },
        ring: 'var(--ring)',
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        chiffonLight: ['var(--font-chiffon-light)'],
        generalSansLight: ['var(--font-general-sans-light)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
