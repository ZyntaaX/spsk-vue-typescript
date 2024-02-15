import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { FIREBASE_ADMIN } from '../../firebase/firebase.module';
import { UserService } from '../../routes/user/user.service';
import { OWN_USER_DECORATOR_METADATA } from './requires.own.user.decorator';

@Injectable()
export class RequiresOwnUserGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseAdmin: app.App,
    @Inject(UserService) private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;

      if (!token) {
        throw new BadRequestException();
      }

      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);

      const paramName = this.reflector.get(
        OWN_USER_DECORATOR_METADATA,
        context.getHandler(),
      );

      const paramUserID = request.params[paramName];
      const dbUserID = await this.userService.getUserUuid({
        external_id: decodedToken.uid,
      });

      if (paramUserID === dbUserID) {
        return true;
      }

      throw new UnauthorizedException(
        'User is missing permission to perform this action',
      );
    } catch (error) {
      throw error;
    }
  }
}
