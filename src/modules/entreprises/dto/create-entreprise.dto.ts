import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { City } from "src/entities/city.entity";
import { Domaine } from "src/entities/domaine.entity";

export class CreateEntrepriseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    localisation: string;

    @IsNotEmpty()
    @IsNumber()
    téléphone: number;

    city:City
    domaines:Domaine[]
}
