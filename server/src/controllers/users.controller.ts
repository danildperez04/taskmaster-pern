import { Request, Response } from 'express';
import { UserService } from '../services/users.service.ts';
import { Inject, Service } from 'typedi';

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

    const userCreated =  await this.userService.create({firstName, lastName, username, email, password,birthDate: new Date(birthDate)});
    
    res.status(201).json({
      message: 'User Created Successfully',
      data: userCreated
    });
  }

  /** PUT `/users/:id` Update the user with the specified id*/
  async update(_req: Request, _res: Response) {
    
  }

  /** DELETE `/users/:id` Remove the user with the specified id*/
  async remove(_req: Request, _res: Response) {
    
  }
}
