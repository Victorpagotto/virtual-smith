import { Request, Response } from 'express';
import * as IT from '../interfaces';
import ProductServices from '../services/product.service';
import ResponseHandler, { IResponse } from '../utils/responseHandler';
import ValidationProduct from '../validation/validation.product';

export default class ProductController {
  services: ProductServices;

  handler: ResponseHandler;

  constructor() {
    this.services = new ProductServices();
    this.handler = new ResponseHandler();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const product: IT.INewProduct = req.body;
    const validation: ValidationProduct = new ValidationProduct(product);
    const valitate: IResponse<string> | boolean = validation.validate();
    if (valitate) {
      const { status, result }: IResponse<string> = valitate as IResponse<string>;
      res.status(status).json(result);
      return undefined;
    }
    const { status, result }: IResponse<IT.IProduct> = await this.services.create(product);
    res.status(status).send(result);
    return undefined;
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const { status, result }: IResponse<IT.IProduct[]> = await this.services.getAll();
    res.status(status).json(result);
    return undefined;
  }
}