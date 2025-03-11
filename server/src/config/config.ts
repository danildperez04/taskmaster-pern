import { DatabaseType } from "typeorm";

import dotenv from 'dotenv';
dotenv.config();

export interface Config{
  host: string;
  port: number;
  db:{
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
}

export const config: Config = {
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 3000,
  db: {
    type: 'postgres',
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_NAME || "test",
  }
};