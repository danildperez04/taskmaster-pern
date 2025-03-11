import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/exceptions.ts";
import chalk from "chalk";
import { ValidationError } from "class-validator";
import { QueryFailedError } from "typeorm";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  
  console.error(chalk.red(err));

  if(err instanceof Array && err[0] instanceof ValidationError ){
    const message = err.map((e: ValidationError) => {
      return Object.values(e.constraints || {});
    });

    res.json({error: message});
    return;
  }

  if(err instanceof HttpException){

    res.json({error: err.message, success: false});
    return;
  }

  if(err instanceof QueryFailedError){
    res.status(500).json({error: 'Ha ocurrido un error inesperado'});
  }

  next(err);
};