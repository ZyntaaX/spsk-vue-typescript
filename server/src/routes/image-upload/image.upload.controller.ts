import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
  NotFoundException,
  // BadRequestException,
  // Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
// import {
//  } from '@nestjs/common';
// FileInterceptor,
// import { FileInterceptor }
// import { User as UserModel } from '@prisma/client';
import { ImageUploadService } from './image.upload.service';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';
import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';
import { RequiresClaim } from 'src/guards/claims-guard/requires.claim.decorator';
// import { ImageUpload } from '@prisma/client';
import { RequiresOwnUser } from 'src/guards/requires-own-user-guard/requires.own.user.decorator';
// import { connect } from 'http2';
// import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';
// import { RequiresClaim } from 'src/guards/claims-guard/requires.claim.decorator';

@Controller('image-upload')
export class ImageUploadController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    // private readonly userService: UserService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  @Post('profile-image/:id')
  @FirebaseAuth(true)
  @RequiresClaim('image_w')
  @RequiresOwnUser('id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const uploadedImage =
        await this.imageUploadService.uploadProfileImageForUser(id, file);
      if (!uploadedImage) throw new BadRequestException('no exist');

      res
        .setHeader('Content-Type', uploadedImage.mimetype)
        .send(uploadedImage.buffer);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const image = await this.imageUploadService.imageUpload({ id });

      if (!image) throw new BadRequestException('no exist');

      res.setHeader('Content-Type', image.mimetype).send(image.buffer);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
