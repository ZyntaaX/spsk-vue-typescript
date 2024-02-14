import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  BadRequestException,
  UnauthorizedException,
  // BadRequestException,
  //   UnauthorizedException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { CLAIMS_DECORATOR_METADATA_VERIFIED_EMAIL } from './requires.claim.decorator';
import { FIREBASE_ADMIN } from '../../firebase/firebase.module';
import { UserService } from 'src/routes/user/user.service';
import { Claim } from '@prisma/client';
// import { EmailNotVerifiedException } from 'src/exceptions/email.not.verified.exception';
// import { EmailNotVerifiedException } from '../exceptions/email.not.verified.exception';

@Injectable()
export class RequiresClaimGuard implements CanActivate {
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

      const requiredClaim = this.reflector.get(
        CLAIMS_DECORATOR_METADATA_VERIFIED_EMAIL,
        context.getHandler(),
      );

      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      const userClaims = await this.userService.getClaimsForUser({
        external_id: decodedToken.uid ?? '',
      });

      // Claim 'all' should ALWAYS return true. This is for superadmins ONLY.
      if (
        userClaims.find(
          (claim: Claim) => claim.key === requiredClaim || claim.key === 'all',
        )
      ) {
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
