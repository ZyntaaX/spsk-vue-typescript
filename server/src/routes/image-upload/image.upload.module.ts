import { Global, Module } from '@nestjs/common';
import { ImageUploadService } from './image.upload.service';
import { ImageUploadController } from './image.upload.controller';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
