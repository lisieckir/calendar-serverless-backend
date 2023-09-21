import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class GetEventsDto {
    @IsNotEmpty()
    @IsDate()
    @Transform( (value)=> new Date(value.value))
    public start: Date

    @IsNotEmpty()
    @IsDate()
    @Transform( (value)=> new Date(value.value))
    public stop?: Date;
}