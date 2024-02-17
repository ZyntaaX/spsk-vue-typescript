import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostCategory, Prisma } from '@prisma/client';
// import { DateTime } from 'luxon';

@Injectable()
export class PostCategoryService {
  constructor(private prisma: PrismaService) {}

  async postCategory(
    postCategoryWhereUniqueInput: Prisma.PostCategoryWhereUniqueInput,
  ): Promise<PostCategory | null> {
    return this.prisma.postCategory.findUnique({
      where: postCategoryWhereUniqueInput,
    });
  }

  async postCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostCategoryWhereUniqueInput;
    where?: Prisma.PostCategoryWhereInput;
    orderBy?: Prisma.PostCategoryOrderByWithRelationInput;
  }): Promise<PostCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.postCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPostCategory(
    data: Prisma.PostCategoryCreateInput,
  ): Promise<PostCategory> {
    return this.prisma.postCategory.create({
      data,
    });
  }

  async updatePostCategory(params: {
    where: Prisma.PostCategoryWhereUniqueInput;
    data: Prisma.PostCategoryUpdateInput;
  }): Promise<PostCategory> {
    const { where, data } = params;
    return this.prisma.postCategory.update({
      data,
      where,
    });
  }

  async deletePostCategory(
    where: Prisma.PostCategoryWhereUniqueInput,
  ): Promise<PostCategory> {
    return this.prisma.postCategory.delete({
      where,
    });
  }
}
