import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ValidationUser {
  username: string;

  classe: string;

  level: number;

  password: string;

  status: string;

  message: string;

  handler: ResponseHandler;

  constructor(userInfo: IT.INewUser) {
    this.username = userInfo ? userInfo.username : '';
    this.classe = userInfo ? userInfo.classe : '';
    this.level = userInfo ? userInfo.level : 0;
    this.password = userInfo ? userInfo.password : '';
    this.status = 'OK';
    this.message = '';
    this.handler = new ResponseHandler();
  }

  userNameExists = (): void => {
    if (!this.username) {
      this.message = '"username" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  userNameIsString = (): void => {
    if (typeof this.username !== 'string') {
      this.message = '"username" must be a string';
      this.status = 'UNPROCESSABLE';
    }
  };

  userNameSize = (): void => {
    if (this.username.length < 3) {
      this.message = '"username" length must be at least 3 characters long';
      this.status = 'UNPROCESSABLE';
    }
  };

  passwordExists = (): void => {
    if (!this.password) {
      this.message = '"password" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  passwordIsString = (): void => {
    if (typeof this.password !== 'string') {
      this.message = '"password" must be a string';
      this.status = 'UNPROCESSABLE';
    }
  };

  passwordSize = (): void => {
    if (this.password.length < 8) {
      this.message = '"password" length must be at least 8 characters long';
      this.status = 'UNPROCESSABLE';
    }
  };

  classeExists = (): void => {
    if (!this.classe) {
      this.message = '"classe" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  classeIsString = (): void => {
    if (typeof this.classe !== 'string') {
      this.message = '"classe" must be a string';
      this.status = 'UNPROCESSABLE';
    }
  };

  classeSize = (): void => {
    if (this.classe.length < 3) {
      this.message = '"classe" length must be at least 3 characters long';
      this.status = 'UNPROCESSABLE';
    }
  };

  levelExists = (): void => {
    if (!this.level && this.level !== 0) {
      this.message = '"level" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  levelIsString = (): void => {
    if (typeof this.level !== 'number') {
      this.message = '"level" must be a number';
      this.status = 'UNPROCESSABLE';
    }
  };

  levelSize = (): void => {
    if (this.level < 1) {
      this.message = '"level" must be greater than or equal to 1';
      this.status = 'UNPROCESSABLE';
    }
  };

  validateUserName = (): void | boolean => {
    const funcs: (() => void)[] = [
      this.userNameExists,
      this.userNameIsString,
      this.userNameSize,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  };

  validatePassword = (): void | boolean => {
    const funcs: (() => void)[] = [
      this.passwordExists,
      this.passwordIsString,
      this.passwordSize,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  };

  validateClasse = (): void | boolean => {
    const funcs: (() => void)[] = [
      this.classeExists,
      this.classeIsString,
      this.classeSize,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  };

  validateLevel = (): void | boolean => {
    const funcs: (() => void)[] = [
      this.levelExists,
      this.levelIsString,
      this.levelSize,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
  };

  validate = (): IResponse<string> | boolean => {
    const funcs: (() => boolean | void)[] = [
      this.validateUserName,
      this.validatePassword,
      this.validateClasse,
      this.validateLevel,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      if (funcs[i]()) {
        return this.handler.response<string>(this.status, this.message);
      }
    }
    return false;
  };
}