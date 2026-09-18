import { apiClient } from '@/lib/api/client';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostInput {
  userId: number;
  title: string;
  body: string;
}

/**
 * Service layer — the ONLY layer allowed to import `apiClient`.
 * Owns endpoints, DTOs and payload mapping. No React imports here.
 */
export const postService = {
  async list(): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>('/posts');
    return data;
  },

  async getById(id: number | string): Promise<Post> {
    const { data } = await apiClient.get<Post>(`/posts/${id}`);
    return data;
  },

  async create(input: CreatePostInput): Promise<Post> {
    const { data } = await apiClient.post<Post>('/posts', input);
    return data;
  },
};
