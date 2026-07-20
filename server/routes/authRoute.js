import express from 'express';
import { authControllers } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const authRouter = express.Router();
const { registerAccount, loginAccount, getUserData } = authControllers;

authRouter.post('/register', registerAccount);
authRouter.post('/login', loginAccount);
authRouter.get('/me', requireAuth, getUserData);

export default authRouter;