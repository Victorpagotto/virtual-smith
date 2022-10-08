import express from 'express';
import productRouter from './routers/product.router';

const app = express();

app.use('/products', productRouter);
app.use(express.json());

export default app;
