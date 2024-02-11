import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostComment, Prisma } from '@prisma/client';

@Injectable()
export class PostCommentService {
  constructor(private prisma: PrismaService) {}

  async postComment(
    postCommentWhereUniqueInput: Prisma.PostCommentWhereUniqueInput,
  ): Promise<PostComment | null> {
    return this.prisma.postComment.findUnique({
      where: postCommentWhereUniqueInput,
    });
  }

  async postComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostCommentWhereUniqueInput;
    where?: Prisma.PostCommentWhereInput;
    orderBy?: Prisma.PostCommentOrderByWithRelationInput;
  }): Promise<PostComment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.postComment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPostComment(params: {
    where: Prisma.PostCommentWhereUniqueInput;
    data: Prisma.PostCommentUpdateInput;
  }): Promise<PostComment> {
    const { where, data } = params;
    return this.prisma.postComment.update({
      data,
      where,
    });
  }

  async updatePostComment(params: {
    where: Prisma.PostCommentWhereUniqueInput;
    data: Prisma.PostCommentUpdateInput;
  }): Promise<PostComment> {
    const { where, data } = params;
    return this.prisma.postComment.update({
      data,
      where,
    });
  }

  async deletePostComment(
    where: Prisma.PostCommentWhereUniqueInput,
  ): Promise<PostComment> {
    return this.prisma.postComment.delete({
      where,
    });
  }
}
