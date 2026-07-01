import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { User } from '../models/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { NotFoundException } from '../utils/exceptions';
import { QueryData } from '../utils/http';
import { dataSource } from '../config/database';

@Service('user.service')
export class UserService {

  private userRepository: Repository<User>;
  
  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  async findAll({limit, skip}: QueryData){
    const users = await this.userRepository.find({take: limit, skip});

    return users.map(({hashedPassword, ...user}) => user);
  }

  async findOne({id}: {id: number}){
    const user = await this.userRepository.findOne({where: {id}});
    
    if(!user){
      throw new NotFoundException('User not found');
    }

    const {hashedPassword, ...newUser} = user;

    return newUser;
  }

  async create(userToCreate: CreateUserDTO) {
    
    return this.userRepository.save({...userToCreate, hashedPassword: await this.encryptPassword(userToCreate.password)});
  }

  async update(userToUpdate: UpdateUserDTO) {

    const user = await this.userRepository.findOne({where: {id: userToUpdate.id}});

    if(!user){
      throw new NotFoundException('User not found');
    }

    Object.assign(user, userToUpdate);
    const updatedUser = await this.userRepository.save(user);
  
    const {hashedPassword, ...newUser} = updatedUser;

    return newUser;
  }

  async remove(id: number){
    const user = await this.userRepository.findOne({where: {id}});

    if(!user){
      throw new NotFoundException('User not found');
    }

    user.isActive = false;

    await this.userRepository.save(user);
  }

  async destroy(userToDelete: User){

    this.userRepository.delete(userToDelete.id);
  }

  async encryptPassword(password: string){
    const SALT = 10;

    const salt = await bcrypt.genSalt(SALT);
    const encryptedPassword = bcrypt.hash(password, salt);

    return encryptedPassword;
  }
}
