import { container } from '@app/config/container';
import { identifiers } from '@app/config/identifiers';
import { auth } from '@app/modules/auth/utils/auth';
import type { TaskController } from '@app/modules/task/controllers/task.controller';
import {
  createTaskPayloadSchema,
  listPaginatedTasksQuerySchema,
  updateTaskPayloadSchema,
} from '@app/modules/task/schemas';
import type {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskRequest,
  ListPaginatedTasksRequest,
  UpdateTaskRequest,
} from '@app/modules/task/types/requests';
import { wrapAsyncMiddleware } from '@app/shared/helpers/middlewares';
import { schemaValidationMiddleware } from '@app/shared/middlewares/schema-validation.middleware';
import { Router } from 'express';

export const tasksRouter = Router();
const controller = container.get<TaskController>(identifiers.TaskController);

tasksRouter.get(
  '/',
  wrapAsyncMiddleware<ListPaginatedTasksRequest>(auth.required),
  // schemaValidationMiddleware({ querySchema: listPaginatedTasksQuerySchema }),
  wrapAsyncMiddleware<ListPaginatedTasksRequest>(controller.index.bind(controller))
);

tasksRouter.get(
  '/:id',
  wrapAsyncMiddleware<GetTaskRequest>(auth.required),
  wrapAsyncMiddleware<GetTaskRequest>(controller.show.bind(controller))
);

tasksRouter.post(
  '/',
  wrapAsyncMiddleware(auth.required),
  schemaValidationMiddleware({ bodySchema: createTaskPayloadSchema }),
  wrapAsyncMiddleware<CreateTaskRequest>(controller.store.bind(controller))
);

tasksRouter.patch(
  '/:id',
  wrapAsyncMiddleware<UpdateTaskRequest>(auth.required),
  schemaValidationMiddleware({ bodySchema: updateTaskPayloadSchema }),
  wrapAsyncMiddleware<UpdateTaskRequest>(controller.update.bind(controller))
);

tasksRouter.delete(
  '/:id',
  wrapAsyncMiddleware<DeleteTaskRequest>(auth.required),
  wrapAsyncMiddleware<DeleteTaskRequest>(controller.destroy.bind(controller))
);
