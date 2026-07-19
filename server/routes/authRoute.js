import express from 'express';
import { authControllers } from '../controllers/authController.js';

const authRouter = express.Router();
const { registerAccount, loginAccount, getUsers } = authControllers;

authRouter.post('/register', registerAccount);
authRouter.post('/login', loginAccount);
authRouter.get('/users', getUsers);

export default authRouter;