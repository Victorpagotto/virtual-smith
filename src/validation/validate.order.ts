import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ValidationOrder {
  productsIds: number[] | string;

  handler: ResponseHandler;

  message: string;

  status: string;

  constructor(prodIds: number[]) {
    this.productsIds = prodIds;
    this.handler = new ResponseHandler();
    this.message = '';
    this.status = 'OK';
  }

  listExists = (): boolean => {
    if (!this.productsIds) {
      this.message = '"productsIds" is required';
      this.status = 'BAD_REQUEST';
      return true;
    }
    return false;
  };

  listIsArray = (): boolean => {
    if (!Array.isArray(this.productsIds)) {
      this.message = '"productsIds" must be an array';
      this.status = 'UNPROCESSABLE';
      return true;
    }
    return false;
  };

  listIsNotEmpty = (): boolean => {
    if (this.productsIds.length < 1) {
      this.message = '"productsIds" must include only numbers';
      this.status = 'UNPROCESSABLE';
      return true;
    }
    return false;
  };

  validate = (): boolean | IResponse<string> => {
    const funcs: (() => boolean | void)[] = [
      this.listExists,
      this.listIsArray,
      this.listIsNotEmpty,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      if (funcs[i]()) {
        return this.handler.response<string>(this.status, this.message);
      }
    }
    return false;
  };
}