import { Entity, ManyToOne } from "typeorm";
import { Content } from "./content.entity";
import { User } from "./user.entity";

@Entity()
export class Habit extends Content{
  frequency: string;

  @ManyToOne(()=> User, (user)=> user.habits)
  user: User;
}