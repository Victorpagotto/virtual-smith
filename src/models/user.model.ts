import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import * as IT from '../interfaces';
import infoHandler, { InfoHandlerReturn } from '../utils/infoHandler';

export default class UserModel {
  db: Pool;

  infoHandler: (info: Record<string, unknown>) => InfoHandlerReturn;

  constructor() {
    this.db = connection;
    this.infoHandler = infoHandler;
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.getCredentials = this.getCredentials.bind(this);
  }

  async create(userInfo: IT.INewUser): Promise<number> {
    const { keys, values, placeHolders }: InfoHandlerReturn = this.infoHandler(userInfo);
    const [[inserId]] = await this.db
      .execute<RowDataPacket[]>(`
      INSERT INTO Trybesmith.Users (${keys}) VALUES (${placeHolders})
    `, [...values]);
    return Number(inserId);
  }

  async getById(id: number): Promise<IT.IUserSession> {
    const [[info]] = await this.db
      .execute<(
    IT.IUserSession & RowDataPacket
    )[]>(
      'SELECT id, username, classe, `level` FROM Trybesmith.Users WHERE id = ?;',
      [id],
      );
    return info;
  }

  async getCredentials(username: string): Promise<IT.IUser> {
    const [[info]] = await this.db
      .execute<(
    IT.IUser & RowDataPacket
    )[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?;',
      [username],
      );
    return info;
  }
}