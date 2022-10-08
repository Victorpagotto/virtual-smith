import express from 'express';
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);

export default app;
