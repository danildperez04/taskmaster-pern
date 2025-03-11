import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { User } from '../models/user.entity.ts';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto.ts';
import { NotFoundException } from '../utils/exceptions.ts';
import { QueryData } from '../utils/http.ts';
import { dataSource } from '../config/database.ts';

@Service('user.service')
export class UserService {

  private userRepository: Repository<User>;
  
  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  async findAll({limit, skip}: QueryData){
    return this.userRepository.find({take: limit, skip});
  }

  async findOne({id}: {id: number}){
    const user = await this.userRepository.findOne({where: {id}});
    
    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
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

    return updatedUser;
  }

  async remove(userToDelete: User){
    this.userRepository.delete(userToDelete.id);
  }

  async encryptPassword(password: string){
    const SALT = 10;

    const salt = await bcrypt.genSalt(SALT);
    const encryptedPassword = bcrypt.hash(password, salt);

    return encryptedPassword;
  }
}
