import type { CreateTaskPayload } from '@app/modules/task/dtos/create-task-payload';
import type { ListPaginatedTasksQuery } from '@app/modules/task/dtos/list-paginated-tasks-query';
import type { UpdateTaskPayload } from '@app/modules/task/dtos/update-task-payload';
import type { Request } from 'express';

export type ListPaginatedTasksRequest = Request<unknown, unknown, unknown, ListPaginatedTasksQuery>;
export type GetTaskRequest = Request<{ id: number }>;
export type CreateTaskRequest = Request<unknown, unknown, CreateTaskPayload>;
export type UpdateTaskRequest = Request<{ id: number }, unknown, UpdateTaskPayload>;
export type DeleteTaskRequest = Request<{ id: number }>;
