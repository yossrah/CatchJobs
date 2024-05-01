import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Domaine } from "./domaine.entity";
import { City } from "./city.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

@Entity({name:"entreprises"})
export class Entreprise extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  name: string;

  @Column({ type: 'varchar', length: 30})
  email: string;

  @Column({ type: 'varchar', length: 30})
  localisation: string;

  @Column({ type: 'varchar', length: 30})
  téléphone: number;

  @ManyToMany(() => Domaine, domaine => domaine.entreprises)
  domaines: Domaine[];

  @ManyToOne(()=>City,(city)=>city.entreprises)
  @JoinTable()
  city:City

  @OneToMany(()=>Job,(job)=>job.entreprise)
  jobs:Job[]

  /*@OneToMany(()=>User,(job)=>user.entreprise)
  recruteurs:User[]*/

}