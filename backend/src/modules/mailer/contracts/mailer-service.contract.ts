export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export abstract class MailerServiceContract {
  public abstract sendMail(options: SendMailOptions): Promise<void>;
}
