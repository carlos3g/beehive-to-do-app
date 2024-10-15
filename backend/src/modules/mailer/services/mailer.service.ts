import type { MailerServiceContract, SendMailOptions } from '@app/modules/mailer/contracts/mailer-service.contract';
import { EnvService } from '@app/shared/services/env.service';
import { injectable } from 'inversify';
import nodemailer from 'nodemailer';

@injectable()
export class MailerService implements MailerServiceContract {
  private transporter: nodemailer.Transporter;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: EnvService.MAIL_HOST,
      port: Number(EnvService.MAIL_PORT),
      auth: {
        user: EnvService.MAIL_USER,
        pass: EnvService.MAIL_PASS,
      },
    });
  }

  public async sendMail(options: SendMailOptions): Promise<void> {
    const mailOptions = {
      from: EnvService.MAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
