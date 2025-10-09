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
      success: string;
      attention: string;
      danger: string;
      done: string;
      sponsors: string;
      text: string;
      textSecondary: string;
      textMuted: string;
      textEmphasis: string;
      border: string;
      borderMuted: string;
      white: string;
      black: string;
    };
    gradients: {
      primary: string;
      hero: string;
      purple: string;
      green: string;
      blue: string;
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