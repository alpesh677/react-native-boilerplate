import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.text}>This is the second sample route.</Text>
      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
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
}));
