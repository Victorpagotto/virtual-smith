import express from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.use(express.json());
loginRouter.post('/', loginController.login);

export default loginRouter;