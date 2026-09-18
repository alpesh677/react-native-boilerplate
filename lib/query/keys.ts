/** Query key factory for posts. Always build keys from here — never inline arrays. */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: () => [...postKeys.lists()] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...postKeys.details(), id] as const,
};
