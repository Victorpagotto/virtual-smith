import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ValidationProduct {
  name: string;

  amount: string;

  message: string;

  status: string;

  handler: ResponseHandler;

  constructor(product: IT.INewProduct) {
    this.name = product ? product.name : '';
    this.amount = product ? product.amount : '';
    this.status = 'OK';
    this.message = '';
    this.handler = new ResponseHandler();
    this.nameExists = this.nameExists.bind(this);
    this.nameIsString = this.nameIsString.bind(this);
    this.nameBiggerThanTwoChar = this.nameBiggerThanTwoChar.bind(this);
    this.amountExists = this.amountExists.bind(this);
    this.amountIsString = this.amountIsString.bind(this);
    this.amountBiggerThanTwoChar = this.amountBiggerThanTwoChar.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateAmount = this.validateAmount.bind(this);
    this.validate = this.validate.bind(this);
  }

  private nameExists(): void {
    if (!this.name) {
      this.message = '"name" is required';
      this.status = 'BAD_REQUEST';
    }
  }

  private nameIsString(): void {
    if (typeof this.name !== 'string') {
      this.message = '"name" must be a string';
      this.status = 'UNPROCESSABLE';
    }
  }

  private nameBiggerThanTwoChar():void {
    if (this.name.length < 3) {
      this.message = '"name" length must be at least 3 characters long';
      this.status = 'UNPROCESSABLE';
    }
  }

  private amountExists(): void {
    if (!this.amount) {
      this.message = '"amount" is required';
      this.status = 'BAD_REQUEST';
    }
  }

  private amountIsString(): void {
    if (typeof this.amount !== 'string') {
      this.message = '"amount" must be a string';
      this.status = 'UNPROCESSABLE';
    }
  }

  private amountBiggerThanTwoChar(): void {
    if (this.amount.length < 3) {
      this.message = '"amount" length must be at least 3 characters long';
      this.status = 'UNPROCESSABLE';
    }
  }

  validateName(): boolean | void {
    const funcs: (() => void)[] = [
      this.nameExists,
      this.nameIsString,
      this.nameBiggerThanTwoChar,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  }

  validateAmount(): boolean | void {
    const funcs: (() => void)[] = [
      this.amountExists,
      this.amountIsString,
      this.amountBiggerThanTwoChar,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  }

  validate(): IResponse<string> | boolean {
    const funcs: (() => boolean | void)[] = [
      this.validateName,
      this.validateAmount,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      if (funcs[i]()) {
        return this.handler.response<string>(this.status, this.message);
      }
    }
    return false;
  }
}