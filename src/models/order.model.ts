import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import * as IT from '../interfaces';
import infoHandler, { InfoHandlerReturn } from '../utils/infoHandler';

export default class OrderMoodel {
  db: Pool;

  infoHandler: (info: Record<string, unknown>) => InfoHandlerReturn;

  constructor() {
    this.db = connection;
    this.infoHandler = infoHandler;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(): Promise<IT.IOrder[]> {
    const [info] = await this.db
      .execute<(IT.IOrder & RowDataPacket)[]>('SELECT * FROM Trybesmith.Orders');
    const orderList = await Promise
      .all(info.map(async (row: IT.IOrder): Promise<IT.IOrder> => {
        const [idsObj] = await this.db
          .execute<(Record<string, number> & RowDataPacket)[]>(`
            SELECT id AS id 
            FROM Trybesmith.Products 
            WHERE orderId = ?`, [row.id]);
        const rowCopy: IT.IOrder = { ...row }; 
        rowCopy.productsIds = [...idsObj.map((idObj: Record<string, number>): number => idObj.id)];
        return rowCopy;
      }));
    return orderList;
  }

  async create(order: IT.ICreateOrder): Promise<IT.ICreateOrder> {
    const UId: number = order.userId;
    const prodIds: number[] = order.productsIds;
    const [{ insertId }] = await this.db
      .execute<(ResultSetHeader)>('INSERT INTO Trybesmith.Orders (userId) VALUES (?)', [UId]);
    await Promise.all(prodIds.map(async (prodId: number): Promise<boolean> => {
      await this.db.execute(`UPDATE Trybesmith.Products
      SET orderId = ?
      WHERE Trybesmith.Products.id = ?`, [insertId, prodId]);
      return true;
    }));
    return { userId: UId, productsIds: [...prodIds] };
  }
}