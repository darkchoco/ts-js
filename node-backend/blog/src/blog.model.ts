export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
  name: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  name?: string;
}
