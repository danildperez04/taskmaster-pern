import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Note{
  @PrimaryGeneratedColumn()
  id: number;
  title: string;
  content: string;

  @ManyToOne(()=> User, (user)=> user.notes)
  user: User;
}