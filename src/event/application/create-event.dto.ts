import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    public title: string;

    @Type(() => Date)
    @Transform( (value: TransformFnParams) => new Date(value.value))
    public date_start: Date;

    @Type(() => Date)
    @Transform( (value: TransformFnParams) => new Date(value.value))
    public date_stop: Date;
}
