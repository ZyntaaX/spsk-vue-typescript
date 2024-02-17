import { Global, Module } from '@nestjs/common';
import { PostCategoryService } from './post.category.service';
import { PostCategoryController } from './post.category.controller';
// import { FirebaseAuthGuard } from '../../guards/auth-guard/firebase.auth.guard';
// import { FirebaseModule } from '../../firebase/firebase.module';

@Global()
@Module({
  controllers: [PostCategoryController],
  providers: [PostCategoryService],
  exports: [PostCategoryService],
  // imports: [FirebaseModule],
})
export class PostCategoryModule {}
