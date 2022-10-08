import express from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.use(express.json());
orderRouter.get('/', orderController.getAll);

export default orderRouter;