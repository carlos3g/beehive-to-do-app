import { z } from 'zod';

export const createTaskPayloadSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
});

export const updateTaskPayloadSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  completed: z.boolean().optional(),
});

export const filterTasksQuerySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const listPaginatedTasksQuerySchema = z.object({
  paginate: z
    .object({
      page: z.number().min(1).optional(),
      perPage: z.number().min(1).optional(),
    })
    .optional(),
  filters: filterTasksQuerySchema.optional(),
});
