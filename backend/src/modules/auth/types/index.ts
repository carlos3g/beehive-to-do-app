import type { ForgotPasswordPayload } from '@app/modules/auth/dtos/forgot-password-payload';
import type { ResetPasswordPayload } from '@app/modules/auth/dtos/reset-password-payload';
import type { SignInPayload } from '@app/modules/auth/dtos/sign-in-payload';
import type { SignUpPayload } from '@app/modules/auth/dtos/sign-up-payload';
import type { Request } from 'express';

export type SignInRequest = Request<unknown, unknown, SignInPayload>;
export type SignUpRequest = Request<unknown, unknown, SignUpPayload>;
export type ForgotPasswordRequest = Request<unknown, unknown, ForgotPasswordPayload>;
export type ResetPasswordRequest = Request<unknown, unknown, ResetPasswordPayload>;
