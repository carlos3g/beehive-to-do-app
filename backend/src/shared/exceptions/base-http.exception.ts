import type { HttpStatus } from '@app/shared/enums/http';

export class HttpException extends Error {
  public response: {
    statusCode: number;
    message: string;
    errors?: string[];
  };

  public constructor(
    public readonly statusCode: HttpStatus,
    public readonly message: string,
    public readonly errors?: string[]
  ) {
    super(message);

    this.response = {
      statusCode,
      message,
      errors,
    };
  }
}
