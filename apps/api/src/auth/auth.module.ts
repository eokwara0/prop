import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth.controller';
import { SServiceModule } from 'lib/services';

@Module({
  imports : [
    SServiceModule
  ],
  controllers : [AuthController],
  providers: [AuthService ],
})
export class AuthModule {}
