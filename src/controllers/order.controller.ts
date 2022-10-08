import { Request, Response } from 'express';
import * as IT from '../interfaces';
import OrderServices from '../services/order.service';
import { IResponse } from '../utils/responseHandler';

export default class OrderController {
  services: OrderServices;

  constructor() {
    this.services = new OrderServices();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { status, result }: IResponse<IT.IOrder[]> = await this.services.getAll();
    return res.status(status).json(result);
  }
}