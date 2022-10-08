import ProductModels from '../models/product.model';
import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ProductServices {
  model: ProductModels;

  handler: ResponseHandler;

  constructor() {
    this.model = new ProductModels();
    this.handler = new ResponseHandler();
  }

  async getAll(): Promise<IResponse<IT.IProduct[]>> {
    const products: IT.IProduct[] = await this.model.getAll();
    return this.handler.response<IT.IProduct[]>('OK', products);
  }
}