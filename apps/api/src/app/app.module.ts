import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { FileModule } from '../file/file.module';
import { MailModule } from 'lib/services/mailservice/mailservice.module';

@Module({
  imports: [
    AuthModule,
    PropertyModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '2d' },
    }),
  ],
})
export class AppModule {}
