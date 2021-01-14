import { Router } from 'express';
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
.post(async (req, res) => {
  try {
    await passSchema.validateAsync(req.body);
    
    res.status(200).json({ 'response': '☕️ huehuehue' });
  } catch(err) {
    let msgs: any[] = [];

    err.details.forEach((erObj: any) => {
      msgs.push(erObj.message);
    })

    res.status(401).json(msgs);
  }

});

export default api;