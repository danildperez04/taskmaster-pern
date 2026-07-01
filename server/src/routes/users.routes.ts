import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import {Container} from "typedi";
import { UserService } from "../services/users.service";
import { validatorHandler } from "../middlewares/validatorHandler";
import { CreateUserDTO, UpdateUserDTO } from "../services/dto/users.dto";
// import { validatorHandler } from "../middlewares/validatorHandler.ts";

const router = Router();

Container.set(UserService, 'user.service');

const userController = Container.get(UserController);

const { findAll, findOne, create, update, remove } = userController;

router.route('/')
  .get(findAll)
  .post(validatorHandler(CreateUserDTO), create);

router.route('/:id')
  .get(findOne)
  .put(validatorHandler(UpdateUserDTO), update)
  .delete(remove);

export default router;