import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import argon2 from 'argon2';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Joi from 'joi';

const api = Router();

const hashSchema = Joi.object().keys({
  payload: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

const verifySchema = Joi.object().keys({
  hash: Joi.string().required(),
  plaintextPass: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

const verifySaltedSchema = Joi.object().keys({
  hash: Joi.string().required(),
  salt: Joi.string().required(),
  plaintextPass: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

// bcrypt
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

// argon2
api.post('/v1/hash/argon2', async (req: Request, res: Response, next: NextFunction) => {
  hashSchema
    .validateAsync(req.body)
    .then((r) => {
      argon2.hash(r.payload).then((hashed) => {
        res.status(200).send({ hashed });
      });
    })
    .catch(next);
});

api.post('/v1/verify/argon2', async (req: Request, res: Response, next: NextFunction) => {
  verifySchema
    .validateAsync(req.body)
    .then((r) => {
      argon2.verify(r.hash, r.plaintextPass).then((match: boolean) => {
        if (match) {
          res.status(200).json({ status: 'match' });
        } else {
          res.status(400).json({ status: 'fail' });
        }
      }); // end of argon2 verify
    })
    .catch(next);
});

// sha256
api.post('/v1/hash/saltedsha256', async (req: Request, res: Response, next: NextFunction) => {
  hashSchema
    .validateAsync(req.body)
    .then((r) => {
      const salt = Date.now();
      const hashed = sha256(salt + r.payload).toString(Base64);
      res.status(200).send({ salt, hashed });
    })
    .catch(next);
});

api.post('/v1/verify/saltedsha256', async (req: Request, res: Response, next: NextFunction) => {
  verifySaltedSchema
    .validateAsync(req.body)
    .then((r) => {
      const hashed = sha256(r.salt + r.plaintextPass).toString(Base64);
      if (hashed == r.hash) {
        res.status(200).json({ status: 'match' });
      } else {
        res.status(400).json({ status: 'fail' });
      }
    })
    .catch(next);
});

export default api;
