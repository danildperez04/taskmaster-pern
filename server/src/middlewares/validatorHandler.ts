import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../services/dto/users.dto";
import { InternalServerErrorException } from "../utils/exceptions";


// Validate a class using class-validator
export function validatorHandler(type: Function) {
  const extractCreateUserDTO = (req: Request) => {
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

  const extractUpdateUserDTO = (req: Request) => {
    const id = Number(req.params.id);
    const {firstName, lastName, username, email, password, birthDate} = req.body;

    const user = new UpdateUserDTO();
    user.id = id;  
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = password;
    user.birthDate = birthDate ? new Date(birthDate) : birthDate;

    return user;
  };
  
  const strategies = {
    'CreateUserDTO': extractCreateUserDTO,
    'UpdateUserDTO': extractUpdateUserDTO,
  };

  type ObjectKey = keyof typeof strategies;


  const strategy = type.name as ObjectKey;

  if(!Object.hasOwn(strategies, strategy)){
    throw new InternalServerErrorException(`Object ${typeof strategies} doesn't have ${strategy} key`);
  }

  const extractionStrategy = strategies[strategy];

  return async (req: Request, _res: Response, next: NextFunction)=>{
    const validator = extractionStrategy(req);

    const errors = await validate(validator);

    console.log(errors);

    if(errors.length > 0){
      next(errors);
      return ;
    }
    
    next();
  };
};