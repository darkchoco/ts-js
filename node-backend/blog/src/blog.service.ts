import { CreatePostDto, PostDto, UpdatePostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BlogService {
  posts: PostDto[] = [];

  getAllPosts(): PostDto[] {
    return this.posts;
  }

  getPostById(id: string): PostDto {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  createPost(post: CreatePostDto): PostDto {
    const now = new Date();

    const createdPost: PostDto = {
      ...post,
      id: (this.posts.length + 1).toString(),
      createdAt: now,
      updatedAt: now,
    };

    this.posts.push(createdPost);
    return createdPost;
  }

  updatePost(id: string, postDto: UpdatePostDto) {
    const updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatedPost = {
      ...this.posts[updateIndex],
      ...postDto,
      updatedAt: new Date(),
    };
    this.posts[updateIndex] = updatedPost;
    return updatedPost;
  }

  deletePost(id: string) {
    // 필터에 걸리지 않는 배열을 새로 만들어서 재할당한다
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
  }
}
