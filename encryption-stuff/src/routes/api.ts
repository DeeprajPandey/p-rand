import { Router, Request, Response } from 'express';
// import bcrypt from 'bcrypt';
import Joi from 'joi';

const api = Router();

const passSchema = Joi.object().keys({
  payload: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
});

api.route('/v1/encrypt')
.post(async (req: Request, res: Response, next) => {
    passSchema.validateAsync(req.body)
    .then(() => {
      res.status(200).json({ 'response': '☕️ huehuehue' });
    })
    .catch(next);

});

export default api;