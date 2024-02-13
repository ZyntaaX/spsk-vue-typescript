import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole, Prisma } from '@prisma/client';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async userRole(
    userWhereUniqueInput: Prisma.UserRoleWhereUniqueInput,
  ): Promise<UserRole | null> {
    return this.prisma.userRole.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async userRoles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserRoleWhereUniqueInput;
    where?: Prisma.UserRoleWhereInput;
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
  }): Promise<UserRole[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userRole.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUserRole(params: {
    where: Prisma.UserRoleWhereUniqueInput;
    data: Prisma.UserRoleUpdateInput;
  }): Promise<UserRole> {
    const { where, data } = params;
    return this.prisma.userRole.update({
      data,
      where,
    });
  }

  async updateUserRole(params: {
    where: Prisma.UserRoleWhereUniqueInput;
    data: Prisma.UserRoleUpdateInput;
  }): Promise<UserRole> {
    const { where, data } = params;
    return this.prisma.userRole.update({
      data,
      where,
    });
  }

  async deleteUserRole(
    where: Prisma.UserRoleWhereUniqueInput,
  ): Promise<UserRole> {
    return this.prisma.userRole.delete({
      where,
    });
  }
}
