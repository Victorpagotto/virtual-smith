export interface StatusCodes {
  [key: string]: number;
}

export interface IMessage {
  message: string;
}

export interface IResponse<T> {
  status: number;
  result: IMessage | T;
}

export const statusCodes: StatusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NO_CONTENT: 204,
  UNPROCESSABLE: 422,
};

export default class ResponseHandler {
  statusCodes: StatusCodes;

  constructor() {
    this.statusCodes = {
      ...statusCodes,
    };
  }

  response<T>(status: string, response: T | string): IResponse<T> {
    if (typeof response !== 'string') {
      const result: T = response as T;
      return { status: this.statusCodes[status], result };
    }
    const message: IMessage = { message: response as string };
    return { status: this.statusCodes[status], result: message };
  }
}