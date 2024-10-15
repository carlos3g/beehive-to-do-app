import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import type { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json(err.response);
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong',
    error: err.message || 'Unknown error',
  });
};
