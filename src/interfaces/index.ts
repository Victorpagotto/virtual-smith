import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface INewUser {
  [key: string]: unknown;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface IUser extends INewUser{
  id: number;
}

export interface IUserSession {
  [key: string]: unknown;
  id: number;
  username: string;
  classe: string;
  level: number;
}

export interface ISession {
  [key: string]: unknown;
  username: string;
  password: string;
}

export interface INewOrder {
  [key: string]: unknown;
  userId?: number;
  productsIds?: number[];
}

export interface ICreateOrder {
  [key: string]: unknown;
  userId: number;
  productsIds: number[];
}

export interface IOrder extends INewOrder {
  id: number;
  userId: number;
}

export interface INewProduct {
  [key: string]: unknown;
  name: string;
  amount: string;
  orderId?: number;
}

export interface IProduct extends INewProduct {
  id: number;
}

export interface AuthConfig {
  [key: string]: string;
}

export interface JwtPayloadData<T> extends JwtPayload {
  data: T;
}

export interface IRequest extends Request {
  user: IUserSession;
}

export interface ProdIds {
  productsIds: number[]
}