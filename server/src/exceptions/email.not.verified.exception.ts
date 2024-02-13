import { UnauthorizedException } from '@nestjs/common';

export class EmailNotVerifiedException extends UnauthorizedException {
  constructor() {
    super('User email is not verified', 'auth/email_not_verified');
  }
}
