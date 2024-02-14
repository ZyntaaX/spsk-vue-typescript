import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  // BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { AUTH_DECORATOR_METADATA_VERIFIED_EMAIL } from './firebase.auth.decorator';
import { FIREBASE_ADMIN } from 'src/firebase/firebase.module';
import { EmailNotVerifiedException } from 'src/exceptions/email.not.verified.exception';
// import { EmailNotVerifiedException } from '../exceptions/email.not.verified.exception';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const requiresVerifiedEmail = this.reflector.get(
      AUTH_DECORATOR_METADATA_VERIFIED_EMAIL,
      context.getHandler(),
    );

    if (!token) {
      console.log('NO TOKEN');

      throw new UnauthorizedException();
    }

    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);

      if (requiresVerifiedEmail && !decodedToken?.email_verified) {
        console.log('NO VERIFIED');

        throw new EmailNotVerifiedException();
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
