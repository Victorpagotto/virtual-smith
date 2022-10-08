import { Request, Response } from 'express';
import Authetificator, { Token } from '../authentication/JWT';
import * as IT from '../interfaces';
import UserServices from '../services/user.service';
import { IResponse } from '../utils/responseHandler';
import ValidationLogin from '../validation/validate.login';

export default class LoginController {
  services: UserServices;

  auth: Authetificator;

  constructor() {
    this.services = new UserServices();
    this.auth = new Authetificator();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginInfo: IT.ISession = req.body;
    const validation: ValidationLogin = new ValidationLogin(loginInfo);
    const valitate: IResponse<string> | IResponse<number> = await validation.validate();
    if (valitate.status !== 200) {
      const { status, result }: IResponse<string> = valitate as IResponse<string>;
      return res.status(status).json(result);
    }
    const { result } = await this.services.getById(valitate.result as number);
    const userToken: Token = this.auth.encode<IT.IUserSession>(result as IT.IUserSession);
    return res.status(200).json(userToken);
  }
}