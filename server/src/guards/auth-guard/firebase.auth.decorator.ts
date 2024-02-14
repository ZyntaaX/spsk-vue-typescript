// import { Reflector } from '@nestjs/core';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase.auth.guard';

export const AUTH_DECORATOR_METADATA_VERIFIED_EMAIL = 'REQUIRES_VERIFIED_EMAIL';

export function FirebaseAuth(requiresVerifiedEmail?: boolean) {
  return applyDecorators(
    SetMetadata(AUTH_DECORATOR_METADATA_VERIFIED_EMAIL, requiresVerifiedEmail),
    UseGuards(FirebaseAuthGuard),
  );
}
