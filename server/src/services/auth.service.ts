import { Inject, Service } from "typedi";
import { UserService } from "./users.service";
import { UserCredentials } from "./dto/users.dto";

@Service('auth.service')
export class AuthService{
  @Inject('user.service')
  private userService: UserService;

  //Do user login
  async login(credentials: UserCredentials){
    const _user = {
      email: credentials.email,
      hashedPassword: this.userService.encryptPassword(credentials.password)
    };

    
  }

  //Register a new user 
  async signup(){

  }
}