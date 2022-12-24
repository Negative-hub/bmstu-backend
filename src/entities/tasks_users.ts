import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Task} from "./task.entity";
import {User} from "./user.entity";

@Entity()
export class TasksUsers {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Task, (task) => task.id)
    task: Task

    @ManyToOne(() => User, (user) => user.id)
    user: User
}