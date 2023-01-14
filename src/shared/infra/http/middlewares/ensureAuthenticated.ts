import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, access_token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      access_token,
      auth.secret_access_token
    ) as IPayload;

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    request.user = { id: user.id };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}

export { ensureAuthenticated };
