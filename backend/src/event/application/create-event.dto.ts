import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    public title: string;

    @Transform( (value)=> new Date(value.value))
    @IsDate()
    public date_start: Date;

    @Transform( (value)=> new Date(value.value))
    @IsDate()
    public date_stop: Date;
}
