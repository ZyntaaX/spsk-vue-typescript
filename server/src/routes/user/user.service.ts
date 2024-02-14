import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma, Claim } from '@prisma/client';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from '../../firebase/firebase.module';

@Injectable()
export class UserService {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: admin.app.App,
    private prisma: PrismaService,
  ) {}

  async getClaimsForUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Claim[] | []> {
    const strippedUser = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: { role: { select: { claims: true } } },
    });

    if (strippedUser && strippedUser.role) {
      const { claims } = strippedUser.role;
      return claims ?? [];
    } else {
      return [];
    }
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      relationLoadStrategy: 'join', // or 'query'
      include: {
        role: {
          include: {
            claims: true,
          },
        },
        posts: true,
        comments: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
      include: {
        role: {
          include: {
            claims: true,
          },
        },
        posts: true,
        comments: true,
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
