import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      secondary: string;
      secondaryDark: string;
      accent: string;
      accentDark: string;
      background: string;
      backgroundSolid: string;
      backgroundLight: string;
      surface: string;
      surfaceLight: string;
      nebulaPurple: string;
      nebulaPink: string;
      nebulaCyan: string;
      nebulaOrange: string;
      starWhite: string;
      starBlue: string;
      text: string;
      textSecondary: string;
      textMuted: string;
      textGlow: string;
      success: string;
      warning: string;
      error: string;
      info: string;
      white: string;
      black: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      cosmic: string;
      nebula: string;
      aurora: string;
      space: string;
      glow: string;
      glass: string;
    };
    fonts: {
      primary: string;
      mono: string;
      display: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    zIndex: {
      dropdown: number;
      modal: number;
      popover: number;
      tooltip: number;
      navbar: number;
    };
  }
}