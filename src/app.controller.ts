import {Controller, Get, Render, Delete, Param} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Render('index')
    @Get()
    async getHello() {
        const columns = await this.appService.getColumns()
        return {columns}
    }

    @Delete('/api/templates/columns/:id')
    async deleteColumn(@Param('id') id: number): Promise<void> {
        await this.appService.deleteColumn(id)
    }
}
