import { Entity, ManyToOne } from "typeorm";
import { Content } from "./content.entity.ts";
import { User } from "./user.entity.ts";

@Entity()
export class Habit extends Content{
  frequency: string;

  @ManyToOne(()=> User, (user)=> user.habits)
  user: User;
}