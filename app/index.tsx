import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function HomeScreen() {
  const { themeName, isDark, isManual, toggle, resetToSystem } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>Open up app/index.tsx to start working on your app!</Text>
      <Text style={styles.text}>
        Theme: {themeName}
        {isManual ? ' (manual)' : ' (system)'}
      </Text>
      <Link href="/details" style={styles.link}>
        Go to Details
      </Link>
      <Link href="/posts" style={styles.link}>
        Go to Posts
      </Link>
      <View style={styles.themeRow}>
        <Button title={isDark ? 'Switch to light' : 'Switch to dark'} onPress={toggle} />
        {isManual ? <Button title="Follow system" onPress={resetToSystem} /> : null}
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  text: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  link: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.link,
    color: theme.colors.primary,
  },
  themeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
}));
