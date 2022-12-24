import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {TasksUsers} from "./tasks_users";

@Entity()
export class User {
  @ApiProperty()
  @OneToMany(() => TasksUsers, (task) => task.user)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({nullable: false})
  name: string;

  @ApiProperty()
  @Column({nullable: false, unique: true})
  email: string;

  @ApiProperty()
  @Column({nullable: false})
  password: string
}
