import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ImageUpload } from '@prisma/client';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from '../../firebase/firebase.module';
import { UserService } from '../user/user.service';
import { DateTime } from 'luxon';

@Injectable()
export class ImageUploadService {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: admin.app.App,
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  async uploadProfileImageForUser(
    userID: string,
    file: Express.Multer.File,
  ): Promise<ImageUpload> {
    try {
      const buffer = Buffer.from(file.buffer);

      const currentUser = await this.userService.user({
        id: userID,
      });

      if (currentUser?.profile_picture_id) {
        this.deleteImageUpload({ id: currentUser?.profile_picture_id });
      }

      const uploadedImage = await this.createImageUpload({
        owner: { connect: { id: userID } },
        buffer: buffer,
        mimetype: file.mimetype,
        filename: file.originalname,
      });

      await this.userService.updateUser({
        where: { id: userID },
        data: {
          profile_picture_id: uploadedImage.id,
          last_login: DateTime.now().toISO(),
        },
      });

      return uploadedImage;
    } catch (error) {
      throw error;
    }
  }

  async imageUpload(
    imageUploadWhereUniqueInput: Prisma.ImageUploadWhereUniqueInput,
  ): Promise<ImageUpload | null> {
    return this.prisma.imageUpload.findUnique({
      where: imageUploadWhereUniqueInput,
      relationLoadStrategy: 'join',
    });
  }

  async imageUploads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImageUploadWhereUniqueInput;
    where?: Prisma.ImageUploadWhereInput;
    orderBy?: Prisma.ImageUploadOrderByWithRelationInput;
  }): Promise<ImageUpload[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.imageUpload.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createImageUpload(
    data: Prisma.ImageUploadCreateInput,
  ): Promise<ImageUpload> {
    return this.prisma.imageUpload.create({
      data,
    });
  }

  async updateImageUpload(params: {
    where: Prisma.ImageUploadWhereUniqueInput;
    data: Prisma.ImageUploadUpdateInput;
  }): Promise<ImageUpload> {
    const { where, data } = params;
    return this.prisma.imageUpload.update({
      data,
      where,
    });
  }

  async deleteImageUpload(
    where: Prisma.ImageUploadWhereUniqueInput,
  ): Promise<ImageUpload> {
    return this.prisma.imageUpload.delete({
      where,
    });
  }
}
