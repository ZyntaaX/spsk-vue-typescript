import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseAuthGuard } from '../../guards/firebase.auth.guard';
// import { FirebaseModule } from '../../firebase/firebase.module';

@Module({
  controllers: [UserController],
  providers: [FirebaseAuthGuard, UserService],
  exports: [UserService],
  // imports: [FirebaseModule],
})
export class UserModule {}
