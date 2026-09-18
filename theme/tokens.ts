/**
 * THE theme file. To re-theme the app, edit only the palettes/scales below.
 * Screens reference semantic tokens (background, text, primary, …) — never hex.
 */

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F6F6F7',
  text: '#1B140C',
  muted: '#6E6A63',
  primary: '#2E78B7',
  success: '#1B7F3B',
  error: '#B00020',
  border: '#E4E1DC',
} as const;

export const darkColors: Record<keyof typeof lightColors, string> = {
  background: '#161210',
  surface: '#221C18',
  text: '#FFFFFF',
  muted: '#A8A198',
  primary: '#5B9BD5',
  success: '#4CAF6D',
  error: '#FF6B6B',
  border: '#3A322B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 999,
} as const;

export const typography = {
  title: 24,
  heading: 20,
  body: 16,
  small: 14,
  link: 18,
} as const;

export type ColorTokens = typeof lightColors;
