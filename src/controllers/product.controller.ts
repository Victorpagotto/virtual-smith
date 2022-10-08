import { Request, Response } from 'express';
import * as IT from '../interfaces';
import ProductServices from '../services/product.service';
import { IResponse } from '../utils/responseHandler';
import ValidationProduct from '../validation/validation.product';

export default class ProductController {
  services: ProductServices;

  constructor() {
    this.services = new ProductServices();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const product: IT.INewProduct = req.body;
    const validation: ValidationProduct = new ValidationProduct(product);
    const valitate: IResponse<string> | boolean = validation.validate();
    if (valitate) {
      const { status, result }: IResponse<string> = valitate as IResponse<string>;
      return res.status(status).json(result);
    }
    const { status, result }: IResponse<IT.IProduct> = await this.services.create(product);
    return res.status(status).send(result);
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { status, result }: IResponse<IT.IProduct[]> = await this.services.getAll();
    return res.status(status).json(result);
  }
}