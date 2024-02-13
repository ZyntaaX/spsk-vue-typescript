import { Controller, Get, Inject, Param } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';
// import { FirebaseAuth } from 'src/guards/firebase.auth.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  // @FirebaseAuth(true)
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id });
  }
}
