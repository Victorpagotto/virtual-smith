import OrderMoodel from '../models/order.model';
import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class OrderServices {
  model: OrderMoodel;

  handler: ResponseHandler;

  constructor() {
    this.handler = new ResponseHandler();
    this.model = new OrderMoodel();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(): Promise<IResponse<IT.IOrder[]>> {
    const orders = await this.model.getAll();
    return this.handler.response<IT.IOrder[]>('OK', orders);
  }

  async create(order: IT.ICreateOrder): Promise<IResponse<IT.ICreateOrder>> {
    const orders = await this.model.create(order);
    return this.handler.response<IT.ICreateOrder>('CREATED', orders);
  }
}