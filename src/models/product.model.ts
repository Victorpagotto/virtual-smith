import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import * as IT from '../interfaces';

export default class ProductModels {
  db: Pool;

  constructor() {
    this.db = connection;
  }

  async create(): Promise<number> {
    const [info] = await this.db.execute();
  }

  async getAll(): Promise<IT.IProduct[]> {
    const [info] = await this.db
      .execute<(IT.IProduct & RowDataPacket)[]>('SELECT * FROM Trybesmith.Products');
    return info;
  }
}