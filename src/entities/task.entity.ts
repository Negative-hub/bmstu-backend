import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";
import {ColumnTask} from "./column.entity"
import {TasksUsers} from "./tasks_users";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    @OneToMany(() => TasksUsers, (task) => task.task)
    id: number

    @Column({nullable: false})
    title: string

    @Column()
    description: string

    @Column({type: 'timestamp', default: () => 'NOW()'})
    started_at: Date

    @Column({type: 'date', nullable: true})
    finished_at: Date

    @ManyToOne(
        () => ColumnTask,
        (columnTask) => columnTask.task,
        {onDelete: 'SET NULL'}
    )
    column: ColumnTask
}