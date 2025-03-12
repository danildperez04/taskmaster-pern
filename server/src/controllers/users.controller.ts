import { Request, Response } from 'express';
import { UserService } from '../services/users.service.ts';
import { Inject, Service } from 'typedi';
import { HttpStatus } from '../utils/httpStatusCode.ts';

@Service()
export class UserController {
  
  @Inject('user.service')
  public userService: UserService;
  
  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  /** GET `/users/` - Find all users */
  async findAll(req: Request, res: Response) {    
      const { limit = 10, skip = 0 } = req.query;
  
      const users = await this.userService.findAll({
        limit: Number(limit),
        skip: Number(skip),
      });
      
      res.json({ message: 'List All Users', data: users });
  }

  /** GET `/users/:id` - Find the user with the specified id*/
  async findOne(req: Request, res: Response) {
    const {id} = req.params;
  
    const user = await this.userService.findOne({id: Number(id)});

    res.json({
      message: `List User #${id}`,
      data: [user]
    });  
  }

  /** POST `/users/` - Create an user */
  async create(req: Request, res: Response) {
    const {firstName, lastName, username, email, password, birthDate} = req.body;

    const user =  await this.userService.create({firstName, lastName, username, email, password,birthDate: new Date(birthDate)});
    
    res.status(HttpStatus.CREATED).json({
      message: 'User Created Successfully',
      data: user
    });
  }

  /** PUT `/users/:id` Update the user with the specified id*/
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {firstName, lastName, username, email, password, birthDate} = req.body;

    const updatedUser = await this.userService.update({
      id,
      firstName, 
      lastName, 
      username, 
      email, 
      password, 
      birthDate: birthDate ? new Date(birthDate) : birthDate
    });

    res.json({
      message: 'User Modified Succesfully',
      data: updatedUser
    });
  }

  /** DELETE `/users/:id` Remove the user with the specified id*/
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    await this.userService.remove(id);

    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
