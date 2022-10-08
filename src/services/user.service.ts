import UserModel from '../models/user.model';
import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class UserServices {
  model: UserModel;

  handler: ResponseHandler;

  constructor() {
    this.handler = new ResponseHandler();
    this.model = new UserModel();
    this.create = this.create.bind(this);
  }

  async create(userInfo: IT.INewUser): Promise<IResponse<IT.IUser>> {
    const id: number = await this.model.create(userInfo);
    const insertUser: IT.IUser = { id, ...userInfo };
    return this.handler.response<IT.IUser>('CREATED', insertUser);
  }
}