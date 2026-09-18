import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCreatePost } from '@/hooks/useCreatePost';
import { usePosts } from '@/hooks/usePosts';

export default function PostsScreen() {
  const { data: posts, isPending, isError, error, refetch, isRefetching } = usePosts();
  const createPost = useCreatePost();
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!title.trim() || createPost.isPending) return;
    createPost.mutate(
      { userId: 1, title: title.trim(), body: 'Created from the sample app.' },
      { onSuccess: () => setTitle('') },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="New post title"
          placeholderTextColor={styles.placeholder.color}
          value={title}
          onChangeText={setTitle}
          editable={!createPost.isPending}
        />
        <Button
          title={createPost.isPending ? 'Creating…' : 'Create post'}
          onPress={handleCreate}
          disabled={!title.trim() || createPost.isPending}
        />
      </View>
      {createPost.isError ? (
        <Text style={styles.error}>
          Create failed: {(createPost.error as Error)?.message ?? 'Unknown error'}
        </Text>
      ) : null}
      {createPost.isSuccess ? <Text style={styles.success}>Post created.</Text> : null}

      {isPending ? (
        <ActivityIndicator size="large" />
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.error}>
            Failed to load posts: {(error as Error)?.message ?? 'Unknown error'}
          </Text>
          <Button title={isRefetching ? 'Retrying…' : 'Retry'} onPress={() => refetch()} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          refreshing={isRefetching}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <Link href={`/posts/${item.id}`} asChild>
              <Pressable style={styles.item}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemBody} numberOfLines={2}>
                  {item.body}
                </Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  heading: {
    fontSize: theme.typography.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  form: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  // Non-view style used as a prop value.
  placeholder: {
    color: theme.colors.muted,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemTitle: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  itemBody: {
    fontSize: theme.typography.small,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  success: {
    color: theme.colors.success,
    marginBottom: theme.spacing.sm,
  },
}));
