import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError'
import authConfig from '../config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  // Validação do Token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub
    }

    next();

  } catch (error) {
    throw new AppError('Invalid JWT token', 401, error);
  }
}

export { ensureAuthenticated }

