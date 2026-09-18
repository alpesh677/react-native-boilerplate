import { StyleSheet } from 'react-native-unistyles';
import { darkColors, lightColors, radius, spacing, typography } from '@/theme/tokens';

const shared = {
  spacing,
  radius,
  typography,
  gap: (v: number) => v * 8,
} as const;

const light = {
  colors: lightColors,
  ...shared,
} as const;

const dark = {
  colors: darkColors,
  ...shared,
} as const;

const appThemes = {
  light,
  dark,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  breakpoints,
  themes: appThemes,
});
