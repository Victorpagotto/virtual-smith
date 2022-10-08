import { JwtPayload } from 'jsonwebtoken';

export interface INewUser {
  username: string
  classe: string
  level: number
  password: string
}

export interface IUser extends INewUser{
  id: number
}

export interface IUserSession {
  username: string
  classe: string
  level: number
  token: string
}

export interface INewOrder {
  userId: number
}

export interface IOrder extends INewOrder {
  id: number
}

export interface INewProduct {
  name: string
  amount: string
  orderId?: number
}

export interface IProduct extends INewProduct {
  id: number
}

export interface AuthConfig {
  [key: string]: string
}

export interface JwtPayloadData extends JwtPayload {
  data: IUserSession;
}