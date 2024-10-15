import { HttpStatus } from '@app/shared/enums/http';
import type { NextFunction, Request, Response } from 'express';
import type { ZodIssue, ZodSchema } from 'zod';
import { ZodError } from 'zod';

export const parseErrorIssue = (errors: ZodIssue[]) => {
  return errors.map((error) => {
    return {
      path: error.path,
      message: error.message,
    };
  });
};

interface SchemaValidationMiddlewareInput<P = unknown, B = unknown, Q = unknown> {
  paramsSchema?: ZodSchema<P>;
  bodySchema?: ZodSchema<B>;
  querySchema?: ZodSchema<Q>;
}

export const schemaValidationMiddleware = <P, B, Q>(input: SchemaValidationMiddlewareInput<P, B, Q>) => {
  const { bodySchema, paramsSchema, querySchema } = input;

  return (req: Request<P, unknown, B, Q>, res: Response, next: NextFunction): void => {
    try {
      if (bodySchema) {
        bodySchema.parse(req.body);
      }

      if (paramsSchema) {
        paramsSchema.parse(req.params);
      }

      if (querySchema) {
        querySchema.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: 'Invalid request data',
          errors: parseErrorIssue(error.errors),
        });
        return;
      }

      next(error);
    }
  };
};
