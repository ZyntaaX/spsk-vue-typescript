import {
  Controller,
  Get,
  Inject,
  Header,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { app } from 'firebase-admin';
import { FIREBASE_ADMIN } from '../../firebase/firebase.module';
import { AuthService } from './auth.service';
import { FirebaseAuth } from 'src/guards/auth-guard/firebase.auth.decorator';

@Controller('authenticate')
export class AuthController {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Header('Content-type', 'application/json')
  @FirebaseAuth(true)
  async findOrAddUserForDB(@Query() params: any): Promise<UserModel> {
    const { external_id, email } = params;

    if (!external_id || !email) {
      throw new BadRequestException();
    }

    return await this.authService.findOrAddUserForDB(external_id, email);
  }
}
