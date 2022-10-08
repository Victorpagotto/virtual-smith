import { Request, Response } from 'express';
import * as IT from '../interfaces';
import UserServices from '../services/user.service';
import Authetificator from '../authentication/JWT';
import { IResponse } from '../utils/responseHandler';
import ValidationUser from '../validation/validation.user';

export default class UserController {
  services: UserServices;

  auth: Authetificator;

  constructor() {
    this.services = new UserServices();
    this.auth = new Authetificator();
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const userInfo: IT.INewUser = req.body;
    const validation: ValidationUser = new ValidationUser(userInfo);
    const valitate: IResponse<string> | boolean = validation.validate();
    if (valitate) {
      const { status, result }: IResponse<string> = valitate as IResponse<string>;
      return res.status(status).json(result);
    }
    const { status, result }: IResponse<IT.IUser> = await this.services.create(userInfo);
    return res.status(status).json(this.auth.encode<IT.IUser>(result as IT.IUser));
  }
}