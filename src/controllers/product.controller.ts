import { Request, Response } from 'express';
import * as IT from '../interfaces';
import ProductServices from '../services/product.service';
import { IResponse } from '../utils/responseHandler';

export default class ProductController {
  services: ProductServices;

  constructor() {
    this.services = new ProductServices();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const { status, result }: IResponse<IT.IProduct[]> = await this.services.getAll();
    res.status(status).json(result);
    return undefined;
  };
}