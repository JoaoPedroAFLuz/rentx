import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import { types } from 'pg';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';

createConnection();

const app = express();

types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
  parseFloat(value)
);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
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
