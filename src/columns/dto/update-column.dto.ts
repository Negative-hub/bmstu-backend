import {ApiProperty} from "@nestjs/swagger";

export class UpdateColumnDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    description: string
}