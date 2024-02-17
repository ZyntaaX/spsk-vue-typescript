import {
  //   BadRequestException,
  Controller,
  // Get,
  Inject,
  // Param,
  //   Post,
  //   Req,
  //   UnauthorizedException,
} from '@nestjs/common';
// import { User as UserModel } from '@prisma/client';
import { PostCategoryService } from './post.category.service';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';
// import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';
// import { RequiresClaim } from 'src/guards/claims-guard/requires.claim.decorator';
//   import { PostCategory as PostCategoryModel } from '@prisma/client';
//   import { UserService } from '../user/user.service';

@Controller('postcategory')
export class PostCategoryController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private readonly postCategoryService: PostCategoryService,
    //   private readonly userService: UserService,
    // private readonly postCategoryService: PostCategoryService;
  ) {}
}
