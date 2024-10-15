import { z } from 'zod';

export const signInPayloadSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'The password must be at least 8 characterss' }),
});

export const signUpPayloadSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'The password must be at least 8 characters' }),
    passwordConfirmation: z.string().min(8, { message: 'The password must be at least 8 characters' }),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'The passwords do not match',
    path: ['passwordConfirmation'],
  });

export const resetPasswordPayloadSchema = z
  .object({
    password: z.string().min(8, { message: 'The password must be at least 8 characters' }),
    passwordConfirmation: z.string().min(8, { message: 'The password must be at least 8 characters' }),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'The passwords do not match',
    path: ['passwordConfirmation'],
  });

export const forgotPasswordPayloadSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});
