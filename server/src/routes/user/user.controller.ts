import { Controller, Get, Inject, Param } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';
import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';
import { RequiresClaim } from 'src/guards/claims-guard/requires.claim.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  @FirebaseAuth(true)
  @RequiresClaim('user_r')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id });
  }

  // @Post(':id/profile_picture')
  // @FirebaseAuth(true)
  // async uploadUserProfilePicture(@Param('id') id: string): Promise<boolean> {

  // }
}
