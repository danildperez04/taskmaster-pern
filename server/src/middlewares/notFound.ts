import { NextFunction, Request, Response } from "express";

export const notFound = (_req: Request, res: Response, _next: NextFunction)=>{
  res.sendStatus(404);
};