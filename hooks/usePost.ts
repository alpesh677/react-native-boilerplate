import { useQuery } from '@tanstack/react-query';
import { postService } from '@/lib/api/services/postService';
import { postKeys } from '@/lib/query/keys';

/** Hook layer — screens consume this, never the service directly. */
export function usePost(id: string | string[] | undefined) {
  const postId = Array.isArray(id) ? id[0] : id;
  return useQuery({
    queryKey: postKeys.detail(postId ?? ''),
    queryFn: () => postService.getById(postId as string),
    enabled: !!postId,
  });
}
