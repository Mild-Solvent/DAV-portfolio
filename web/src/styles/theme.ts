export const theme = {
  colors: {
    // GitHub Dark color scheme
    primary: '#0d1117',        // GitHub dark background
    primaryDark: '#010409',    // GitHub darker background
    primaryLight: '#161b22',   // GitHub canvas default
    secondary: '#1f6feb',      // GitHub blue
    secondaryDark: '#1158c7',  // GitHub darker blue
    accent: '#58a6ff',         // GitHub accent blue
    accentDark: '#388bfd',     // GitHub hover blue
    
    // GitHub backgrounds
    background: '#0d1117',
    backgroundSolid: '#0d1117',
    backgroundLight: '#161b22',
    surface: '#21262d',        // GitHub border default
    surfaceLight: '#30363d',   // GitHub border muted
    
    // GitHub accent colors
    success: '#3fb950',        // GitHub success
    attention: '#d29922',      // GitHub attention
    danger: '#f85149',         // GitHub danger
    done: '#a371f7',           // GitHub done (purple)
    sponsors: '#db61a2',       // GitHub sponsors (pink)
    
    // GitHub text colors
    text: '#c9d1d9',           // GitHub foreground default
    textSecondary: '#8b949e',  // GitHub foreground muted
    textMuted: '#6e7681',      // GitHub foreground subtle
    textEmphasis: '#ffffff',   // White for emphasis
    
    // GitHub borders
    border: '#30363d',         // GitHub border default
    borderMuted: '#21262d',    // GitHub border muted
    
    white: '#FFFFFF',
    black: '#000000',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)',
    hero: 'linear-gradient(135deg, #d2a8ff 0%, #a371f7 10%, #196c2e 20%, #2ea043 30%, #56d364 85%, #b4f1b4 100%)',
    purple: 'linear-gradient(135deg, #d2a8ff 0%, #a371f7 100%)',
    green: 'linear-gradient(135deg, #3fb950 0%, #56d364 100%)',
    blue: 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)',
  },
  fonts: {
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    display: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '2rem',      // 32px
    '4xl': '2.5rem',    // 40px
    '5xl': '3rem',      // 48px
    '6xl': '4rem',      // 64px
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  borderRadius: {
    sm: '0.375rem',  // 6px - GitHub default
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 0 rgba(27, 31, 36, 0.04)',
    md: '0 3px 6px rgba(140, 149, 159, 0.15)',
    lg: '0 8px 24px rgba(140, 149, 159, 0.2)',
    xl: '0 12px 48px rgba(140, 149, 159, 0.3)',
  },
  breakpoints: {
    sm: '544px',
    md: '768px',
    lg: '1012px',
    xl: '1280px',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    navbar: 1080,
  },
};
