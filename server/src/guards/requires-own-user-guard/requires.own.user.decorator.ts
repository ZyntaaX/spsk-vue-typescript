import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RequiresOwnUserGuard } from './requires.own.user.guard';

export const OWN_USER_DECORATOR_METADATA = 'REQUIRES_OWN_USER_GUARD';

export function RequiresOwnUser(paramName: string) {
  return applyDecorators(
    SetMetadata(OWN_USER_DECORATOR_METADATA, paramName),
    UseGuards(RequiresOwnUserGuard),
  );
}
