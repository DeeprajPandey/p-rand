import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const api = Router();

const hashSchema = Joi.object().keys({
  payload: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

const verifySchema = Joi.object().keys({
  hash: Joi.string().required(),
  plaintextPass: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

api.post('/v1/hash/bcrypt', async (req: Request, res: Response, next: NextFunction) => {
  hashSchema
    .validateAsync(req.body)
    .then((r) => {
      bcrypt.hash(r.payload, 11).then((hashed) => {
        res.status(200).json({ hashed });
      });
    })
    .catch(next);
});
api.post('/v1/verify/bcrypt', async (req: Request, res: Response, next: NextFunction) => {
  verifySchema
    .validateAsync(req.body)
    .then((r) => {
      bcrypt.compare(r.plaintextPass, r.hash).then((match) => {
        if (match) {
          res.status(200).json({ status: 'match' });
        } else {
          res.status(400).json({ status: 'fail' });
        }
      }); // end of bcrypt compare
    })
    .catch(next);
});

export default api;
