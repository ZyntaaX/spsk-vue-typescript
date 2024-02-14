import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RequiresClaimGuard } from './requires.claim.guard';

export const CLAIMS_DECORATOR_METADATA_VERIFIED_EMAIL = 'REQUIRES_CLAIM_GUARD';

export function RequiresClaim(requiredClaim: string) {
  return applyDecorators(
    SetMetadata(CLAIMS_DECORATOR_METADATA_VERIFIED_EMAIL, requiredClaim),
    UseGuards(RequiresClaimGuard),
  );
}
