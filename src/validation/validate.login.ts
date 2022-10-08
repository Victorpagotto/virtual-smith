import * as IT from '../interfaces';
import UserServices from '../services/user.service';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class ValidationLogin {
  username: string;

  password: string;

  message: string;

  status: string;

  service: UserServices;

  handler: ResponseHandler;

  constructor(loginInfo: IT.ISession) {
    this.username = loginInfo ? loginInfo.username : '';
    this.password = loginInfo ? loginInfo.password : '';
    this.message = '';
    this.status = 'OK';
    this.service = new UserServices();
    this.handler = new ResponseHandler();
  }

  userNameExists = (): void => {
    if (!this.username) {
      this.message = '"username" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  passwordExists = (): void => {
    if (!this.password) {
      this.message = '"password" is required';
      this.status = 'BAD_REQUEST';
    }
  };

  validateCredentials = async (): Promise<boolean | number> => {
    const userCredentials = await this.service.getCredentials(this.username);
    if (!userCredentials || userCredentials.password !== this.password) {
      this.message = 'Username or password invalid';
      this.status = 'UNAUTHORIZED';
      return false;
    }
    return userCredentials.id;
  };

  validateUserName = (): void | boolean => {
    const funcs: (() => void)[] = [
      this.userNameExists,
      this.passwordExists,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      funcs[i]();
      if (this.message) return true;
    }
    return false;
  };

  validate = async (): Promise<IResponse<string> | IResponse<number>> => {
    const funcs: (() => boolean | void)[] = [
      this.validateUserName,
    ];
    for (let i = 0; i < funcs.length; i += 1) {
      if (funcs[i]()) {
        return this.handler.response<string>(this.status, this.message);
      }
    }
    const isUser = await this.validateCredentials();
    if (!isUser) {
      return this.handler.response<string>(this.status, this.message);
    }
    return this.handler.response('OK', isUser) as IResponse<number>;
  };
}