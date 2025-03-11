import { NextFunction, Request, Response } from "express";
// import fs from 'fs/promises';

export const logger = async (req: Request, res: Response, next: NextFunction)=>{
  const log = `[${req.method}]: ${req.path}`;
  
  console.log(log);

  // const buffer = await fs.readFile('/src/');
};