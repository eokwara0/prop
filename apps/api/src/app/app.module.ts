import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    AuthModule,
    PropertyModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '2d' },
    }),
  ],
})
export class AppModule {}
