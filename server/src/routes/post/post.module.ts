import { Global, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
// import { FirebaseAuthGuard } from '../../guards/auth-guard/firebase.auth.guard';
// import { FirebaseModule } from '../../firebase/firebase.module';

@Global()
@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
  // imports: [FirebaseModule],
})
export class PostModule {}
