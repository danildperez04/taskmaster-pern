import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  title: string;

  @Column({type: "varchar", nullable: true})
  description?: string;
}