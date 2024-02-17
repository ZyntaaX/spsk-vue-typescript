import {
  BadRequestException,
  Controller,
  Get,
  // Get,
  Inject,
  // Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
// import { User as UserModel } from '@prisma/client';
import { PostService } from './post.service';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';
import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';
import { RequiresClaim } from 'src/guards/claims-guard/requires.claim.decorator';
import { Post as PostModel, Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PostCategoryService } from '../post-category/post.category.service';

@Controller('post')
export class PostController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly postCategoryService: PostCategoryService,
    // private readonly postCategoryService: PostCategoryService;
  ) {}

  @Get('news')
  async getAllNews(): Promise<PostModel[] | null> {
    return this.postService.posts({
      where: { category: { name: 'news' }, published: true },
      orderBy: { published_at: Prisma.SortOrder.desc },
    });
  }

  @Post('/news')
  @FirebaseAuth(true)
  @RequiresClaim('news_w')
  async postNews(@Req() req: Request): Promise<PostModel | null> {
    try {
      // const category_id = 'ade1af3a-f5f7-489b-bf64-8ee4038e68c8';
      const category = await this.postCategoryService.postCategory({
        name: 'news',
      });

      if (!category) throw new BadRequestException();

      // const
      const body: any = req.body;
      const headers: any = req.headers;

      const token = headers.authorization;

      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      const user = await this.userService.user({
        external_id: decodedToken.uid,
      });

      if (!user) throw new UnauthorizedException();

      const post = await this.postService.createOrUpdatePost({
        postTitle: body?.title,
        postSubheader: body?.subheader,
        postContent: body?.content,
        publish: body?.publish,
        postID: body?.postID,
        category_id: category.id,
        author_id: user?.id,
      });

      return post;
    } catch (error) {
      console.log('ERROR: ', error);

      throw new BadRequestException('Could not post news story');
    }
  }

  //   @Get(':id')
  //   @FirebaseAuth(true)
  //   @RequiresClaim('user_r')
  //   async getUserById(@Param('id') id: string): Promise<UserModel | null> {
  //     return this.userService.user({ id });
  //   }

  // @Post(':id/profile_picture')
  // @FirebaseAuth(true)
  // async uploadUserProfilePicture(@Param('id') id: string): Promise<boolean> {

  // }
}
