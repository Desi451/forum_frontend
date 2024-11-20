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
