import { JwtPayload } from 'jsonwebtoken';

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
  username: string;
  classe: string;
  level: number;
  token: string;
}

export interface INewOrder {
  [key: string]: unknown;
  userId?: number;
}

export interface IOrder extends INewOrder {
  id: number;
  userId: number;
  productsIds?: number[];
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
