import { Link, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { usePost } from '@/hooks/usePost';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post, isPending, isError, error, refetch } = usePost(id);

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Failed to load post: {(error as Error)?.message ?? 'Unknown error'}
        </Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Link href="/posts" style={styles.link}>
        Back to Posts
      </Link>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.heading,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  body: {
    fontSize: theme.typography.body,
    lineHeight: theme.typography.body * 1.5,
    color: theme.colors.text,
  },
  link: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.link,
    color: theme.colors.primary,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
}));
