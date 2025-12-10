import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_TRANSPORT')
    private readonly mailer: Transporter,
  ) {}

  async sendMail(options: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    from?: string;
  }) {
    return await this.mailer.sendMail({
      from: options.from || '"My App" <no-reply@myapp.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  }

  // Example: welcome email
  async sendWelcomeEmail(to: string) {
    return this.sendMail({
      to,
      subject: 'Welcome!',
      html: `
        <h2>Hello 👋</h2>
        <p>Your account has been created successfully.</p>
      `,
      text: 'Your account has been created successfully.',
    });
  }
}
