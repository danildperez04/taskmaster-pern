import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../services/dto/users.dto.ts";

export function validatorHandler(type: Function) {
  const extractUser = (req: Request) => {
    const {firstName, lastName, username, email, password, birthDate} = req.body;

    const user = new CreateUserDTO();  
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = password;
    user.birthDate = new Date(birthDate);

    return user;
  };
  
  return async (req: Request, _res: Response, next: NextFunction)=>{
    let validator = {};

    if(type.name.includes('UserDTO')){
      validator = extractUser(req);
    }

    const errors = await validate(validator);

    if(errors.length > 0){
      next(errors);
      return ;
    }
    
    next();
  };
};