import { Controller, Get, Param } from '@nestjs/common';
import { UserRole as UserRoleModel } from '@prisma/client';
import { UserRoleService } from './user.role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get(':id')
  async getUserRoleById(
    @Param('id') id: string,
  ): Promise<UserRoleModel | null> {
    return this.userRoleService.userRole({ id });
  }
}
