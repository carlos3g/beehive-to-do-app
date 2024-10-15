import { EnvService } from '@app/shared/services/env.service';
import type { Request } from 'express';
import { expressjwt } from 'express-jwt';

export const getTokenFromHeaders = (req: Request): string => {
  const token = req.headers.authorization?.split(' ')[1];
  return token || '';
};

export const auth = {
  required: expressjwt({
    secret: EnvService.BEEHIVE_JWT_SECRET,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: expressjwt({
    secret: EnvService.BEEHIVE_JWT_SECRET,
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
};
