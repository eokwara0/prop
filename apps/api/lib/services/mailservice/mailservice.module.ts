import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { MailService } from './mailservice.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'MAIL_TRANSPORT',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return nodemailer.createTransport({
          host: config.get('SMTP_HOST'),
          port: config.get('SMTP_PORT'),
          secure: false,
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        });
      },
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
