import {ApiProperty} from "@nestjs/swagger";

export class updateTaskDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty({required: false})
    finished_at?: Date

    @ApiProperty()
    column_id: number
}