import '@/theme/unistyles';
import { Stack } from 'expo-router';
import { QueryProvider } from '@/lib/query/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}
