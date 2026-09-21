import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import pkg from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg;

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  connectionLimit: 5,
  connectTimeout: 10000,
});

const prisma = new PrismaClient({ adapter });

export default prisma;