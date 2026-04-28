import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export type BlogDocument = Blog & Document; // 블로그이면서 도큐먼트인 타입 정의
export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  name!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
