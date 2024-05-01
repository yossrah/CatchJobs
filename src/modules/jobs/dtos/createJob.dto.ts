import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { City } from "src/entities/city.entity";
import { Domaine } from "src/entities/domaine.entity";
import { Entreprise } from "src/entities/entreprise.entity";
import { User } from "src/entities/user.entity";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    exigences:string;
    
    @IsString()
    technologies:string;

    @IsString()
    langues:string;

    @IsNotEmpty()
    @IsString()
    type_contrat:string;
    
    @IsNotEmpty()
    @IsNumber()
    nb_postes:number

    @IsNumber()
    salaire:number

    ExpiresAt:Date

    isAvailable:boolean

    @IsNotEmpty()  
    city:City

    @IsNotEmpty()
    domaine:Domaine

    /*@IsNotEmpty()
    entreprise:Entreprise*/

}