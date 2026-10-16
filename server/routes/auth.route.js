import express from 'express';
import { authControllers } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const authRouter = express.Router();
const { registerAccount, loginAccount, logoutAccount, getUserData, updateUsername } = authControllers;

authRouter.post('/register', registerAccount);
authRouter.post('/login', loginAccount);
authRouter.post('/logout', logoutAccount);
authRouter.get('/me', requireAuth, getUserData);
authRouter.patch('/username', requireAuth, updateUsername);

export default authRouter;