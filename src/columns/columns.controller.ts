import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
    UseGuards,
} from "@nestjs/common";
import {Response} from 'express'
import {ColumnsServices} from "./columns.services";
import {CreateColumnDto} from "./dto/create-column.dto";
import {UpdateColumnDto} from "./dto/update-column.dto";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../guards/auth.guard";

@ApiTags('columns')
@Controller('api/columns')
export class ColumnsController {
    constructor(private readonly userServices: ColumnsServices) {}

    @Get()
    @ApiOperation({description: 'Получение всех колонок', summary: 'Получение всех колонок'})
    getColumns() {
        return this.userServices.getColumns()
    }

    @Post()
    @ApiOperation({description: 'Создание колонки', summary: 'Создание колонки'})
    @UseGuards(AuthGuard)
    @ApiBody({type: CreateColumnDto})
    createColumn(@Body() createColumnDto: CreateColumnDto) {
        return this.userServices.createColumn(createColumnDto)
    }

    @Put(':id')
    @ApiOperation({description: 'Редактирование колонки', summary: 'Редактирование колонки'})
    @UseGuards(AuthGuard)
    @ApiBody({type: UpdateColumnDto})
    updateColumn(@Body() updateColumnDto: UpdateColumnDto) {
        return this.userServices.updateColumn(updateColumnDto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({description: 'Удаление колонки', summary: 'Удаление колонки'})
    deleteColumn(@Param('id') id: number, @Res() res: Response) {
        this.userServices.deleteColumn(id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
    }
}