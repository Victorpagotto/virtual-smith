import {
  sign as jwtSign,
  verify as jwtVerify,
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions } from 'jsonwebtoken';
import { config } from 'dotenv';
import * as Interfaces from '../interfaces/index';

config();

class Authetificator {
  sign: (payload: JwtPayload, secret: Secret, options?: SignOptions) => string;

  verify: (token: string, secret: Secret, options?: VerifyOptions) => Jwt | JwtPayload | string;
  
  constructor() {
    this.sign = jwtSign;
    this.verify = jwtVerify;
  }

  encode(payload: Interfaces.IUserSession): string {
    const JWTConfig: Interfaces.AuthConfig = { expiresIn: '1d', algorithm: 'HS256' }; 
    const secret: string = process.env.SECRET || 'randomword';
    const token: string = this.sign({ data: payload }, secret, JWTConfig);
    return token;
  }

  decode(token: string):Interfaces.IUserSession {
    const secret: string = process.env.SECRET || 'randomword';
    const decoded = this.verify(token, secret) as Interfaces.JwtPayloadData;
    const info: Interfaces.IUserSession = decoded.data;
    return info;
  }
}

export default Authetificator;