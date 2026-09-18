import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postService,
  type CreatePostInput,
} from '@/lib/api/services/postService';
import { postKeys } from '@/lib/query/keys';

/** Mutation example: seeds the detail cache and invalidates lists on success. */
export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePostInput) => postService.create(input),
    onSuccess: (created) => {
      queryClient.setQueryData(postKeys.detail(created.id), created);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
