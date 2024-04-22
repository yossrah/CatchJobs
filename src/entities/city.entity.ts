import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entreprise } from "./entreprise.entity";
import { Job } from "./job.entity";

@Entity({name:"cities"})
export class City extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  city: string;

  @OneToMany(()=>Entreprise,(entreprise)=>entreprise.city)
  entreprises:Entreprise[]

  @OneToMany(()=>Job,(job)=>job.city)
  jobs:Job[]
}