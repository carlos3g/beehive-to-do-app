export class EnvService {
  public static get BEEHIVE_PORT(): string {
    return process!.env.BEEHIVE_PORT as unknown as string;
  }

  public static get BEEHIVE_JWT_SECRET(): string {
    return process!.env.BEEHIVE_JWT_SECRET as unknown as string;
  }

  public static get DB_HOST(): string {
    return process!.env.DB_HOST as unknown as string;
  }

  public static get DB_PORT(): string {
    return process!.env.DB_PORT as unknown as string;
  }

  public static get DB_DATABASE(): string {
    return process!.env.DB_DATABASE as unknown as string;
  }

  public static get DB_USERNAME(): string {
    return process!.env.DB_USERNAME as unknown as string;
  }

  public static get DB_PASSWORD(): string {
    return process!.env.DB_PASSWORD as unknown as string;
  }

  public static get DB_SCHEMA(): string {
    return process!.env.DB_SCHEMA as unknown as string;
  }

  public static get DB_URL(): string {
    return process!.env.DB_URL as unknown as string;
  }

  public static get MAIL_FROM(): string {
    return process!.env.MAIL_FROM as unknown as string;
  }

  public static get MAIL_HOST(): string {
    return process!.env.MAIL_HOST as unknown as string;
  }

  public static get MAIL_PORT(): string {
    return process!.env.MAIL_PORT as unknown as string;
  }

  public static get MAIL_USER(): string {
    return process!.env.MAIL_USER as unknown as string;
  }

  public static get MAIL_PASS(): string {
    return process!.env.MAIL_PASS as unknown as string;
  }
}
