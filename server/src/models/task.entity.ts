import { Column, Entity, ManyToOne } from "typeorm";
import { Content } from "./content.entity.ts";
import { User } from "./user.entity.ts";

export enum TaskStatus{
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed'
}

@Entity({})
export class Task extends Content{
  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.Pending})
  status: TaskStatus;

  @Column({type: 'timestamp'})
  dueDate: Date;

  @ManyToOne(()=> User, (user) => user.tasks)
  user: User;
}