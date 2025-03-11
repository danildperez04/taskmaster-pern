import { Router } from "express";
import { UserController } from "../controllers/users.controller.ts";
import {Container} from "typedi";
import { UserService } from "../services/users.service.ts";
import { validatorHandler } from "../middlewares/validatorHandler.ts";
import { CreateUserDTO } from "../services/dto/users.dto.ts";
// import { validatorHandler } from "../middlewares/validatorHandler.ts";

const router = Router();

Container.set(UserService, 'user.service');

const userController = Container.get(UserController);

const { findAll, findOne, create, update, remove } = userController;

router.route('/').get(findAll).post(validatorHandler(CreateUserDTO), create);

router.route('/:id').get(findOne).put(update).delete(remove);

export default router;