import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = `Well, this is awkward. We can't find what you are looking for`;
  response.status(404).send(message);
};
