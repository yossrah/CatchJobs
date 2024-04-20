import { IsNotEmpty, IsString } from "class-validator";

export class CreateDomaineDto {
    @IsNotEmpty()
    @IsString()
    name:string
}
