import { Injectable } from '@nestjs/common';
import { CreatePostDto, PostDto, UpdatePostDto } from './blog.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: CreatePostDto): Promise<PostDto>;
  getPost(id: string): Promise<PostDto | null>;
  updatePost(id: string, postDto: UpdatePostDto): Promise<PostDto | null>;
  deletePost(id: string): Promise<void>;
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async getAllPost(): Promise<PostDto[]> {
    const posts = await this.blogModel.find().exec();
    return posts.map((post) => this.toDto(post));
  }

  async createPost(postDto: CreatePostDto): Promise<PostDto> {
    const createPost = await this.blogModel.create(postDto);
    return this.toDto(createPost);
  }

  async getPost(id: string): Promise<PostDto | null> {
    const post = await this.blogModel.findById(id).exec();
    return post ? this.toDto(post) : null;
  }

  async updatePost(
    id: string,
    postDto: UpdatePostDto,
  ): Promise<PostDto | null> {
    const updatedPost = await this.blogModel
      .findByIdAndUpdate(id, postDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    return updatedPost ? this.toDto(updatedPost) : null;
  }

  async deletePost(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id).exec();
  }

  private toDto(post: BlogDocument): PostDto {
    return {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      name: post.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
