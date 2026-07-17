import express from 'express';
import { authControllers } from '../controllers/authController.js';

const authRouter = express.Router();
const { registerAccount, loginAccount } = authControllers;

authRouter.post('/register', registerAccount);
authRouter.post('/login', loginAccount);

export default authRouter;