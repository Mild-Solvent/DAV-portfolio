import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // GitHub Dark color scheme
        primary: {
          DEFAULT: '#0d1117',
          dark: '#010409',
          light: '#161b22',
        },
        secondary: {
          DEFAULT: '#1f6feb',
          dark: '#1158c7',
        },
        accent: {
          DEFAULT: '#58a6ff',
          dark: '#388bfd',
        },
        background: {
          DEFAULT: '#0d1117',
          solid: '#0d1117',
          light: '#161b22',
        },
        surface: {
          DEFAULT: '#21262d',
          light: '#30363d',
        },
        // GitHub accent colors
        success: '#3fb950',
        attention: '#d29922',
        danger: '#f85149',
        done: '#a371f7',
        sponsors: '#db61a2',
        // GitHub text colors
        text: {
          DEFAULT: '#c9d1d9',
          secondary: '#8b949e',
          muted: '#6e7681',
          emphasis: '#ffffff',
        },
        border: {
          DEFAULT: '#30363d',
          muted: '#21262d',
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "'Noto Sans'", "Helvetica", "Arial", "sans-serif", "'Apple Color Emoji'", "'Segoe UI Emoji'"],
        mono: ["ui-monospace", "SFMono-Regular", "'SF Mono'", "Menlo", "Consolas", "'Liberation Mono'", "monospace"],
        display: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "'Noto Sans'", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        '4xl': '2.5rem',     // 40px
        '5xl': '3rem',       // 48px
        '6xl': '4rem',       // 64px
      },
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
        '4xl': '6rem',     // 96px
      },
      borderRadius: {
        'sm': '0.375rem',  // 6px - GitHub default
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 0 rgba(27, 31, 36, 0.04)',
        'md': '0 3px 6px rgba(140, 149, 159, 0.15)',
        'lg': '0 8px 24px rgba(140, 149, 159, 0.2)',
        'xl': '0 12px 48px rgba(140, 149, 159, 0.3)',
      },
      screens: {
        'sm': '544px',
        'md': '768px',
        'lg': '1012px',
        'xl': '1280px',
      },
      zIndex: {
        'dropdown': '1000',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'navbar': '1080',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)',
        'gradient-hero': 'linear-gradient(135deg, #d2a8ff 0%, #a371f7 10%, #196c2e 20%, #2ea043 30%, #56d364 85%, #b4f1b4 100%)',
        'gradient-purple': 'linear-gradient(135deg, #d2a8ff 0%, #a371f7 100%)',
        'gradient-green': 'linear-gradient(135deg, #3fb950 0%, #56d364 100%)',
        'gradient-blue': 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)',
      },
    },
  },
  plugins: [],
}

export default config