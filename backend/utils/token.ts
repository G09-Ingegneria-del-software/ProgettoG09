const jwt = require('jsonwebtoken');

export const generateToken = (secret: string, expiresIn: Number, payload: object) => {
  try{
    return jwt.sign(payload, secret, { expiresIn });
  } catch (err) {
    return "";
  }
}

export const verifyToken = async (secret: string, token: string) => {
    let x = await jwt.verify(token, secret, (err: any, decoded: any) => {
    return decoded;
  });
  return x ? x : false;
}