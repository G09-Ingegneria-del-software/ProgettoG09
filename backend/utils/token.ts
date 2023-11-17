const jwt = require('jsonwebtoken');

export const generateToken = (secret: string, expiresIn: Number, payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

export const verifyToken = (secret: string, token: string) => {
  return jwt.verify(token, secret);
}