import type { NextFunction, Response } from 'express';

export const wrapAsyncMiddleware = <Req = Request>(fn: (req: any, res: Response, next: NextFunction) => unknown) => {
  return (req: Req, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
