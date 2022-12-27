import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res, UseGuards, Query,
} from "@nestjs/common";
import {TasksServices} from "./tasks.services";
import {Response} from 'express'
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateTaskDto} from "./dto/create-task.dto";
import {updateTaskDto} from "./dto/update-task.dto";
import {AuthGuard} from "../guards/auth.guard";

@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksServices: TasksServices) {}

    @Get()
    @ApiOperation({description: 'Получение всех задач', summary: 'Получение всех задач'})
    getUserTasks(@Query('query') query: string) {
        return this.tasksServices.getTasksByUser(query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({description: 'Создание задачи', summary: 'Создание задачи'})
    @ApiBody({type: CreateTaskDto})
    createTask(@Body() data: CreateTaskDto) {
        return this.tasksServices.createTask(data)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({description: 'Редактирование задачи', summary: 'Редактирование задачи'})
    @ApiBody({type: updateTaskDto})
    updateTask(@Body() updateUserDto: updateTaskDto) {
        return this.tasksServices.updateTask(updateUserDto)
    }

    @Delete('/users/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({description: 'Удаление юзера из задачи', summary: 'Удаление юзера из задачи'})
    deleteUserFromTask(@Param('id') id: number, @Res() res: Response) {
        this.tasksServices.deleteUserFromTask(id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({description: 'Удаление задачи', summary: 'Удаление задачи'})
    deleteTask(@Param('id') id: number, @Res() res: Response) {
        this.tasksServices.deleteTask(id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
    }
}