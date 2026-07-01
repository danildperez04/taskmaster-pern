import { IsDate, IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, Length} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @Length(3,10)
  firstName: string;

  @IsString()
  @Length(3,10)
  lastName: string;

  @IsString()
  @Length(6, 15)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsDate()
  birthDate: Date;
}

export class UpdateUserDTO{
  @IsNumber()
  id: number;
  
  @IsOptional()
  @IsString()
  @Length(3,10)
  firstName?:string;
  
  @IsOptional()
  @IsString()
  @Length(3,10)
  lastName?: string;
  
  @IsOptional()
  @IsString()
  @Length(6,15)
  username?:string;

  @IsOptional()
  @IsEmail()
  email?:string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;
}

export class UserCredentials{
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}