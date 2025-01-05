export type thread = {
  threadId: number;
  title: string;
  authorId: number;
  authorNickname: string;
  description: string;
  creationDate?: Date;
  tags: string[];
  image: string;
  images: string[];
  subthreads: thread[]
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

export type createSubThread = {
  userId: number;
  parentId: number;
  description: string;
  images: File[];
}

export type ThreadListPagination = {
  data: thread[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}