import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty({required: false})
    finished_at?: Date

    @ApiProperty()
    column_id: number

    @ApiProperty()
    user_id: number
}