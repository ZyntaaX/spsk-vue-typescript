import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user-role/user.role.module';

@Module({
  imports: [UserModule, UserRoleModule],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [AuthService], // TODO: Not needed, ever?
})
export class AuthModule {}
