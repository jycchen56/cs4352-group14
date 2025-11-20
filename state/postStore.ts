
export type Post = {
  id: string;
  authorId: string;
  authorName?: string;
  clubId?: string;
  eventId?: string;
  content: string;
  createdAt: string;
};

const posts: Post[] = [];

export function createPost(p: Omit<Post, 'id' | 'createdAt'>) {
  const post: Post = {
    ...p,
    id: `post-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  return post;
}

export function listPosts() {
  return posts;
}

export function listPostsByUser(userId: string) {
  return posts.filter((x) => x.authorId === userId);
}

export function listPostsForEvent(eventId: string) {
  return posts.filter((x) => x.eventId === eventId);
}
