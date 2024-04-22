import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    localisation:string;

    @IsNumber()
    salaire:number

    ExpiresAt:Date

    isAvailable:boolean

}