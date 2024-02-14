import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { FirebaseAuthGuard } from '../../guards/auth-guard/firebase.auth.guard';
// import { FirebaseModule } from '../../firebase/firebase.module';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  // imports: [FirebaseModule],
})
export class UserModule {}
