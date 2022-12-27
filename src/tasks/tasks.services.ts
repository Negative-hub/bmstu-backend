import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {TasksUsers} from "../entities/tasks_users";
import {Task} from "../entities/task.entity";
import {ColumnTask} from "../entities/column.entity";
import {CreateTaskDto} from './dto/create-task.dto'
import {updateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksServices {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(TasksUsers)
        private readonly tasksUsersRepository: Repository<TasksUsers>,
        @InjectRepository(ColumnTask)
        private readonly columnRepository: Repository<ColumnTask>
    ) {
    }

    // GET ALL TASKS
    async getTasksByUser(query: string): Promise<ColumnTask[]> {
        return await this.columnRepository
            .createQueryBuilder('column')
            .select(['column.id', 'column.title', 'column.description', 'user.name', 'user.id', 'user.email'])
            .leftJoinAndMapMany('column.tasks', 'column.task', 'task')
            .where("task.title like :query", {query: `%${query || ''}%`})
            .leftJoinAndMapMany('task.pivot', 'task.id', 'tasks_users')
            .leftJoinAndSelect('tasks_users.user', 'user')
            .orderBy('column.id')
            .getMany()
    }

    // CREATE TASK
    async createTask(data: CreateTaskDto): Promise<Task> {
        const user = await this.userRepository.findOneBy({id: data.user_id})
        const column = await this.columnRepository.findOneBy({id: data.column_id})

        const task = await this.taskRepository.save({
            title: data.title,
            description: data.description,
            finished_at: data.finished_at,
            column: column
        })

        await this.tasksUsersRepository.save({user, task})

        return task
    }

    // UPDATE TASK
    async updateTask(data: updateTaskDto): Promise<Task> {
        const column = await this.columnRepository.findOneBy({id: data.column_id})

        await this.taskRepository.update({id: data.id}, {
            title: data.title,
            description: data.description,
            finished_at: data.finished_at,
            column: column
        })

        return this.taskRepository.findOneBy({id: data.id})
    }

    async deleteUserFromTask(id: number): Promise<DeleteResult> {
        return await this.tasksUsersRepository
            .createQueryBuilder('tasksUsers')
            .delete()
            .from(TasksUsers)
            .where('id = :id', {id})
            .execute()
    }

    async deleteTask(id: number): Promise<DeleteResult> {
        await this.tasksUsersRepository
            .createQueryBuilder('tasksUsers')
            .delete()
            .from(TasksUsers)
            .where('task = :id', {id})
            .execute()

        return await this.taskRepository.delete({id})
    }
}