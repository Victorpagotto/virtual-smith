import {
  sign as jwtSign,
  verify as jwtVerify,
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions } from 'jsonwebtoken';
import { config } from 'dotenv';
import * as IT from '../interfaces/index';

config();

export interface Token {
  token: string;
}

export default class Authetificator {
  sign: (payload: JwtPayload, secret: Secret, options?: SignOptions) => string;

  verify: (token: string, secret: Secret, options?: VerifyOptions) => Jwt | JwtPayload | string;
  
  constructor() {
    this.sign = jwtSign;
    this.verify = jwtVerify;
  }

  encode<T>(payload: T): Token {
    const JWTConfig: IT.AuthConfig = { expiresIn: '1d', algorithm: 'HS256' }; 
    const secret: string = process.env.SECRET || 'randomword';
    const token: string = this.sign({ data: payload }, secret, JWTConfig);
    return { token };
  }

  decode<T>(token: string):T {
    const secret: string = process.env.SECRET || 'randomword';
    const decoded = this.verify(token, secret) as IT.JwtPayloadData<T>;
    const info: T = decoded.data;
    return info;
  }
}
