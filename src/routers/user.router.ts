import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.use(express.json());
userRouter.post('/', userController.create);

export default userRouter;