import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdatePost(params: {
    postID?: string;
    postTitle?: string;
    postSubheader?: string;
    postContent?: string;
    publish?: boolean;
    author_id: string;
    category_id: string;
  }): Promise<Post | null> {
    const {
      postID,
      postTitle,
      postSubheader,
      postContent,
      publish,
      category_id,
      author_id,
    } = params;

    const existingPost = postID
      ? await this.prisma.post.findUnique({ where: { id: postID } })
      : undefined;

    if (existingPost) {
      return this.prisma.post.update({
        where: { id: existingPost.id },
        data: {
          title: postTitle ?? existingPost.title,
          subheader: postSubheader ?? existingPost.subheader,
          content: postContent ?? existingPost.content,
          published: publish ?? existingPost.published,
          published_at: publish
            ? DateTime.now().toISO()
            : existingPost.published_at,
          category_id,
          author_id,
          updated_at: publish
            ? existingPost.published
              ? DateTime.now().toISO()
              : null
            : null,
        },
      });
    }

    return this.prisma.post.create({
      data: {
        title: postTitle ?? '',
        subheader: postSubheader ?? '',
        content: postContent ?? '',
        author_id,
        category_id,
        published: publish ?? false,
        published_at: publish ? DateTime.now().toISO() : null,
        created_at: DateTime.now().toISO(),
      },
    });
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
