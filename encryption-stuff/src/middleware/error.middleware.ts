import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(error);
  }

  const status = error.statusCode || 500;
  const message = error.message || `It's not you, it's us.`;

  response.status(status).send(message);
};
