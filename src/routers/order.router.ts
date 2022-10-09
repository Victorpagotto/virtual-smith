import express from 'express';
import OrderController from '../controllers/order.controller';
import Middlewere from '../middlewere';

const orderRouter = express.Router();
const orderController = new OrderController();
const middleweres = new Middlewere();

orderRouter.use(express.json());
orderRouter.get('/', orderController.getAll);
orderRouter.post('/', middleweres.authenticateJWT, orderController.create);

export default orderRouter;