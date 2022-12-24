import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {ColumnTask} from "../entities/column.entity";
import {TasksUsers} from "../entities/tasks_users";
import {TasksController} from "./tasks.controller";
import {TasksServices} from "./tasks.services";
import {Task} from "../entities/task.entity"

@Module({
    imports: [TypeOrmModule.forFeature([User, ColumnTask, TasksUsers, Task])],
    controllers: [TasksController],
    providers: [TasksServices]
})
export class TasksModule {}