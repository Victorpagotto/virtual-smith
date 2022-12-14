import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import * as IT from '../interfaces';
import infoHandler, { InfoHandlerReturn } from '../utils/infoHandler';

export default class ProductModels {
  db: Pool;

  infoHandler: (info: Record<string, unknown>) => InfoHandlerReturn;

  constructor() {
    this.db = connection;
    this.infoHandler = infoHandler;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async create(product: IT.INewProduct): Promise<number> {
    const { keys, values, placeHolders }: InfoHandlerReturn = this.infoHandler(product);
    const [[inserId]] = await this.db
      .execute<RowDataPacket[]>(`
        INSERT INTO Trybesmith.Products (${keys}) VALUES (${placeHolders})
      `, [...values]);
    return Number(inserId);
  }

  async getAll(): Promise<IT.IProduct[]> {
    const [info] = await this.db
      .execute<(IT.IProduct & RowDataPacket)[]>('SELECT * FROM Trybesmith.Products');
    return info;
  }
}