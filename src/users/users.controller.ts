import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
} from "@nestjs/common";
import {UsersServices} from "./users.services";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Response} from 'express'
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('api/users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly userServices: UsersServices) {}
    @Get()
    @ApiOperation({description: 'Получение всех пользователей', summary: 'Получение всех пользователей'})
    getUsers() {
        return this.userServices.getUsers()
    }

    @Get(':id')
    @ApiOperation({description: 'Получение пользователя по id', summary: 'Получение пользователя по id'})
    getUser(@Param('id') id: number) {
        return this.userServices.getUser(id)
    }

    @Post()
    @ApiOperation({description: 'Создание пользователя', summary: 'Создание пользователя'})
    @ApiBody({type: CreateUserDto, description: '12412'})
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userServices.createUser(createUserDto)
    }

    @Put(':id')
    @ApiOperation({description: 'Редактирование пользователя', summary: 'Редактирование пользователя'})
    @ApiBody({type: UpdateUserDto})
    updateUser(@Body() updateUserDto: UpdateUserDto) {
        return this.userServices.updateUser(updateUserDto)
    }

    @Delete(':id')
    @ApiOperation({description: 'Удаление пользователя', summary: 'Удаление пользователя'})
    deleteUser(@Param('id') id: number, @Res() res: Response) {
        this.userServices.deleteUser(id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
    }
}