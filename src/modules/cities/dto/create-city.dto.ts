import { IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    city:string
}
