import { Injectable } from '@nestjs/common';
import {ColumnTask} from "./entities/column.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(ColumnTask)
      private readonly columnRepository: Repository<ColumnTask>
  ) {}
  getColumns(): Promise<ColumnTask[]> {
    return this.columnRepository.find();
  }

  deleteColumn(id): Promise<DeleteResult> {
    return this.columnRepository.delete({id})
  }
}
