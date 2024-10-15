import 'dotenv/config';

import '@app/config/container';

import { AppDataSource } from '@app/config/typeorm';
import { authRouter } from '@app/modules/auth/router';
import { tasksRouter } from '@app/modules/task/router';
import { errorHandlerMiddleware } from '@app/shared/middlewares/error-handler.middleware';
import { EnvService } from '@app/shared/services/env.service';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

void AppDataSource.initialize();

const app: Express = express();
const port = EnvService.BEEHIVE_PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(pinoHttp());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
