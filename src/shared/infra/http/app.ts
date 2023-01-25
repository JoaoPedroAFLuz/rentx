import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { types } from 'pg';
import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';

import upload from '@config/upload';
import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import swaggerFile from '../../../swagger.json';
import { router } from './routes';

createConnection();

const app = express();

types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
  parseFloat(value)
);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(router);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error: ${error.message}`,
    });
  }
);

export { app };
