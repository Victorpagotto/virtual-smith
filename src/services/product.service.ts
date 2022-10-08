import ProductModels from '../models/product.model';
import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ProductServices {
  model: ProductModels;

  handler: ResponseHandler;

  constructor() {
    this.model = new ProductModels();
    this.handler = new ResponseHandler();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async create(product: IT.INewProduct): Promise<IResponse<IT.IProduct>> {
    const id: number = await this.model.create(product);
    const insertProduct: IT.IProduct = { id, ...product };
    return this.handler.response<IT.IProduct>('CREATED', insertProduct);
  }

  async getAll(): Promise<IResponse<IT.IProduct[]>> {
    const products: IT.IProduct[] = await this.model.getAll();
    return this.handler.response<IT.IProduct[]>('OK', products);
  }
}