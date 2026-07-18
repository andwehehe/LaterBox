import express from "express";
import cors from "cors";
import session from 'express-session';
import dotenv from 'dotenv';
import authRouter from "./routes/authRoute.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // true when using HTTPS in production
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

app.use('/auth', authRouter);

export default app;