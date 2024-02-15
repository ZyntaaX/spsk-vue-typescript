import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './routes/user/user.module';
import { UserRoleModule } from './routes/user-role/user.role.module';
import { PostCommentModule } from './routes/post-comments/post.comment.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './routes/auth/auth.module';
import { ImageUploadModule } from './routes/image-upload/image.upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env', cache: true }),
    // Global Modules
    PrismaModule,
    FirebaseModule,
    // - - - - - - -
    AuthModule,
    UserModule,
    UserRoleModule,
    PostCommentModule,
    ImageUploadModule,
  ],
})
export class AppModule {}
