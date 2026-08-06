import express from "express";
import cors from "cors";
import session from 'express-session';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route.js";
import bookmarkRouter from "./routes/bookmark.route.js";

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
app.use('/bookmarks', bookmarkRouter);

export default app;