import { Controller, Get, Param } from '@nestjs/common';
// import { UserDto } from './user.dto';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id });
  }
}
