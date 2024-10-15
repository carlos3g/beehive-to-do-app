import { container } from '@app/config/container';
import { identifiers } from '@app/config/identifiers';
import type { AuthController } from '@app/modules/auth/controllers/auth.controller';
import {
  forgotPasswordPayloadSchema,
  resetPasswordPayloadSchema,
  signInPayloadSchema,
  signUpPayloadSchema,
} from '@app/modules/auth/schemas';
import type { DeleteUsedPasswordChangeRequestTask } from '@app/modules/auth/tasks/delete-used-password-change-request.task';
import { auth } from '@app/modules/auth/utils/auth';
import { CronExpression } from '@app/shared/enums/cron';
import { wrapAsyncMiddleware } from '@app/shared/helpers/middlewares';
import { schemaValidationMiddleware } from '@app/shared/middlewares/schema-validation.middleware';
import { Router } from 'express';
import cron from 'node-cron';

export const authRouter = Router();
const controller = container.get<AuthController>(identifiers.AuthController);
const deleteUsedPasswordChangeRequestTask = container.get<DeleteUsedPasswordChangeRequestTask>(
  identifiers.DeleteUsedPasswordChangeRequestTask
);

authRouter.post(
  '/sign-in',
  schemaValidationMiddleware({ bodySchema: signInPayloadSchema }),
  wrapAsyncMiddleware(controller.signIn.bind(controller))
);

authRouter.post(
  '/sign-up',
  schemaValidationMiddleware({ bodySchema: signUpPayloadSchema }),
  wrapAsyncMiddleware(controller.signUp.bind(controller))
);

authRouter.post(
  '/forgot-password',
  schemaValidationMiddleware({ bodySchema: forgotPasswordPayloadSchema }),
  wrapAsyncMiddleware(controller.forgotPassword.bind(controller))
);

authRouter.post(
  '/reset-password',
  schemaValidationMiddleware({ bodySchema: resetPasswordPayloadSchema }),
  wrapAsyncMiddleware(controller.resetPassword.bind(controller))
);

// @ts-expect-error generics is not always that easy
authRouter.get('/me', wrapAsyncMiddleware(auth.required), wrapAsyncMiddleware(controller.me.bind(controller)));

cron.schedule(
  CronExpression.EVERY_HOUR,
  deleteUsedPasswordChangeRequestTask.run.bind(deleteUsedPasswordChangeRequestTask)
);
