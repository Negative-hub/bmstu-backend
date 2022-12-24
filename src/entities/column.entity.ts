import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Task} from "./task.entity";

@Entity()
export class ColumnTask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @OneToMany(() => Task, (task) => task.column)
    task: Task[]
}