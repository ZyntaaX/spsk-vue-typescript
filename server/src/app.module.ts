import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user.role.module';
import { PostCommentModule } from './post-comments/post.comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env', cache: true }),
    PrismaModule,
    FirebaseModule,
    UserModule,
    UserRoleModule,
    PostCommentModule,
  ],
  // controllers: [/*AppController,*/ CatsController, UserController],
  // providers: [PrismaService, AppService, UserService],
})
export class AppModule {}
