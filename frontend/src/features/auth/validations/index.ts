import * as z from 'zod';
import { validateEmail, validatePassword } from '@/lib/zod/zod-predefinitions.helper';

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Campo obrigatório' }),
    email: validateEmail().optional(),
    password: validatePassword(),
    passwordConfirmation: validatePassword(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'Aceite os termos de uso e privacidade' }),
    }),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'As senhas inseridas devem ser iguais',
    path: ['passwordConfirmation'],
  });

export const loginFormSchema = z.object({
  email: validateEmail(),
  password: validatePassword(),
  remember: z.boolean(),
});

export const forgotPasswordFormSchema = z.object({
  email: validateEmail(),
});

export const resetPasswordFormSchema = z
  .object({
    password: validatePassword(),
    passwordConfirmation: validatePassword(),
    code: z.string().min(6, { message: 'O código tem 6 digitos' }).max(6, { message: 'O código tem 6 digitos' }),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'As senhas inseridas devem ser iguais',
    path: ['passwordConfirmation'],
  });
