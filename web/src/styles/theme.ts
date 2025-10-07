export const theme = {
  colors: {
    // Professional primary palette
    primary: '#0F172A',        // Deep slate
    primaryDark: '#020617',    // Almost black
    primaryLight: '#1E293B',   // Lighter slate
    secondary: '#3B82F6',      // Professional blue
    secondaryDark: '#1D4ED8',  // Darker blue
    accent: '#06B6D4',         // Cyan accent
    accentDark: '#0891B2',     // Darker cyan
    
    // Sophisticated backgrounds
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    backgroundSolid: '#0F172A',
    backgroundLight: 'rgba(30, 41, 59, 0.95)',
    surface: 'rgba(51, 65, 85, 0.1)',
    surfaceLight: 'rgba(71, 85, 105, 0.05)',
    
    // Accent colors (more subtle)
    nebulaPurple: '#6366F1',
    nebulaPink: '#EC4899',
    nebulaCyan: '#06B6D4',
    nebulaOrange: '#F59E0B',
    starWhite: '#F8FAFC',
    starBlue: '#BFDBFE',
    
    // Professional text colors
    text: '#F8FAFC',          // Almost white
    textSecondary: '#CBD5E1',  // Light gray
    textMuted: '#64748B',      // Medium gray
    textGlow: '#E2E8F0',       // Very light gray
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    white: '#FFFFFF',
    black: '#000000',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    secondary: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
    cosmic: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    nebula: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    aurora: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
    space: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    glow: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    display: "'Cal Sans', 'Inter', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
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