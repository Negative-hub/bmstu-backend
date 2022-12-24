import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ColumnTask} from "../entities/column.entity";
import {ColumnsController} from "./columns.controller";
import {ColumnsServices} from "./columns.services";

@Module({
    imports: [TypeOrmModule.forFeature([ColumnTask])],
    controllers: [ColumnsController],
    providers: [ColumnsServices]
})
export class ColumnsModule {}