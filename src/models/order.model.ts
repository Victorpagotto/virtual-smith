import { Pool, RowDataPacket } from 'mysql2/promise';
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
  }

  async getAll(): Promise<IT.IOrder[]> {
    const [info] = await this.db
      .execute<(IT.IOrder & RowDataPacket)[]>('SELECT * FROM Trybesmith.Orders');
    const orderList = await Promise
      .all(info.map(async (row: IT.IOrder): Promise<IT.IOrder> => {
        const [ids] = await this.db
          .execute<(number & RowDataPacket)[]>(`
            SELECT id AS product_id 
            FROM Trybesmith.Products 
            WHERE orderId = ?`, [row.id]);
        const rowCopy: IT.IOrder = { ...row }; 
        rowCopy.productsIds = [...ids];
        return rowCopy;
      }));
    return orderList;
  }
}