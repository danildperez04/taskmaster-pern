import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

export * from './config.ts';
export * from './database.ts';