import { useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

type ThemeName = 'light' | 'dark';

/**
 * Theme switcher. The OS adaptive theme applies by default;
 * toggle() takes manual control, resetToSystem() hands control back.
 * Screens using themed styles re-render automatically on theme change,
 * so themeName/isDark are always read fresh at render time.
 */
export function useAppTheme() {
  // Bumps the consumer on manual switches so labels update instantly.
  const [manual, setManual] = useState<ThemeName | null>(null);

  const toggle = () => {
    const next: ThemeName = UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark';
    // Manual control requires opting out of adaptive themes first —
    // setTheme() throws while adaptiveThemes is enabled.
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(next);
    setManual(next);
  };

  const resetToSystem = () => {
    UnistylesRuntime.setAdaptiveThemes(true);
    setManual(null);
  };

  return {
    themeName: UnistylesRuntime.themeName,
    isDark: UnistylesRuntime.themeName === 'dark',
    isManual: manual !== null,
    toggle,
    resetToSystem,
  };
}
