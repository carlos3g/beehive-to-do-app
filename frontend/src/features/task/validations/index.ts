import * as z from 'zod';

export const createTaskFormSchema = z.object({
  title: z.string().min(6, { message: 'O titúlo deve ter pelo menos 6 caracteres' }),
  description: z.string().min(6, { message: 'A descrição deve ter pelo menos 6 caracteres' }),
});

export const updateTaskFormSchema = z
  .object({
    title: z.string().min(6, { message: 'O titúlo deve ter pelo menos 6 caracteres' }),
    description: z.string().min(6, { message: 'A descrição deve ter pelo menos 6 caracteres' }),
    completed: z.boolean(),
  })
  .deepPartial();
