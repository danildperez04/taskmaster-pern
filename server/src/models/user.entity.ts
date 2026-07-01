import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from './task.entity';
import { Habit } from './habit.entity';
import { Note } from './note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true})
  username: string;

  @Column({ type: 'varchar', unique: true})
  email: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;

  @Column({ type: 'timestamp' })
  birthDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
