import { useQuery } from '@tanstack/react-query';
import { postService } from '@/lib/api/services/postService';
import { postKeys } from '@/lib/query/keys';

/** Hook layer — screens consume this, never the service directly. */
export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: () => postService.list(),
  });
}
