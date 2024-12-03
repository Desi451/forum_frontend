export type thread = {
  id: number;
  authorId: number;
  author: string;
  title: string;
  description: string;
  tags: string[];
  creationDate: Date;
}

export type threadDetail = {
  thread: thread;
  ogThreadId: number;
  images: File[];
}

export type createThread = {
  userId: number;
  title: string;
  description: string;
  images: File[];
  tags: string[];
}
