const jwt = require('jsonwebtoken');

export const generateToken = (secret: string, expiresIn: Number, payload: object) => {
  return jwt.sign(payload, secret, { expiresIn });
}

export const verifyToken = (secret: string, token: string) => {
  try {
    jwt.verify(token, secret);
    return true;
  }catch(err) {
    return false;
  }
}