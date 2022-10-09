import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import Authetificator from '../authentication/JWT';
import * as IT from '../interfaces';
import ResponseHandler, { IResponse } from '../utils/responseHandler';

export default class Middlewere {
  auth: Authetificator;

  handler: ResponseHandler;

  constructor() {
    this.auth = new Authetificator();
    this.handler = new ResponseHandler();
  }

  authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const token: string = req.header('Authorization') as string;
    if (!token) {
      const { status, result }: IResponse<string> = this.handler
        .response('UNAUTHORIZED', 'Token not found');
      return res.status(status).json(result);
    }
    try {
      req.body.user = this.auth.decode<IT.IUserSession>(token);
      return next();
    } catch (_err) {
      const { status, result }: IResponse<string> = this
        .handler.response('UNAUTHORIZED', 'Invalid token');
      return res.status(status).json(result);
    }
  };

  errorHandler: ErrorRequestHandler = async (_err, req, res, _next): Promise<Response> => (
    res.status(500).json('Internal server error.')
  );
}