import { Request, Response } from 'express';
import * as IT from '../interfaces';
import OrderServices from '../services/order.service';
import { IResponse } from '../utils/responseHandler';
import ValidationOrder from '../validation/validate.order';

export default class OrderController {
  services: OrderServices;

  constructor() {
    this.services = new OrderServices();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { status, result }: IResponse<IT.IOrder[]> = await this.services.getAll();
    return res.status(status).json(result);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const prodIds: number[] = req.body.productsIds;
    const userInfo: IT.IUserSession = req.body.user;
    const validation: ValidationOrder = new ValidationOrder(prodIds);
    const valitate: IResponse<string> | boolean = await validation.validate();
    if (valitate) {
      const { status, result }: IResponse<string> = valitate as IResponse<string>;
      return res.status(status).json(result);
    }
    const orderInfo: IT.ICreateOrder = { userId: userInfo.id, productsIds: prodIds };
    const { status, result }: IResponse<IT.ICreateOrder> = await this.services.create(orderInfo);
    return res.status(status).json(result);
  }
}