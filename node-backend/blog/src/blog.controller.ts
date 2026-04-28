import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import type { CreatePostDto, PostDto, UpdatePostDto } from './blog.model';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllPosts(): PostDto[] {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): PostDto {
    return this.blogService.getPostById(id);
  }

  @Post()
  createPost(@Body() postDto: CreatePostDto): string {
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() postDto: UpdatePostDto): string {
    this.blogService.updatePost(id, postDto);
    return 'success';
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): string {
    this.blogService.deletePost(id);
    return 'success';
  }
}
