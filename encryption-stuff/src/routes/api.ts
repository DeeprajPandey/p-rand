import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const api = Router();

const passSchema = Joi.object().keys({
  payload: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
});

api.route('/v1/bcrypt')
.post(async (req: Request, res: Response, next) => {
    passSchema.validateAsync(req.body)
    .then((r) => {
      bcrypt.hash(r.payload, 11)
      .then((hashed) => {
        res.status(200).json({ hashed });
      })
    })
    .catch(next);

});

export default api;