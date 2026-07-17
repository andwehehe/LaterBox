import express from "express";
import cors from "cors";
import sessionConfig from "./config/sessionConfig.js";
import authRouter from "./routes/authRoute.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(sessionConfig());

app.use('/auth', authRouter);

export default app;