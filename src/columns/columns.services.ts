import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {ColumnTask} from "../entities/column.entity";
import {CreateColumnDto} from './dto/create-column.dto'
import {UpdateColumnDto} from "./dto/update-column.dto";

@Injectable()
export class ColumnsServices {
    constructor(
        @InjectRepository(ColumnTask)
        private readonly columnRepository: Repository<ColumnTask>
    ) {}

    // GET ALL COLUMNS
    async getColumns(): Promise<ColumnTask[]> {
        return this.columnRepository.find()
    }

    // CREATE COLUMN
    async createColumn(data: CreateColumnDto): Promise<ColumnTask> {
        return await this.columnRepository.save(data)
    }

    // UPDATE COLUMN
    async updateColumn({id, ...data}: UpdateColumnDto): Promise<UpdateResult> {
        const column = this.columnRepository.findOneBy({id})

        if (column) {
            return this.columnRepository.update({id}, {...column, ...data})
        } else {
            return new Promise((resolve, reject) => reject())
        }
    }

    // DELETE COLUMN
    async deleteColumn(id: number): Promise<DeleteResult> {
        return this.columnRepository.delete({id})
    }
}