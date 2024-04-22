import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entreprise } from "./entreprise.entity";
import { Job } from "./job.entity";

@Entity({name:"domaines"})
export class Domaine extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  name: string;

  @ManyToMany(() => Entreprise, entreprise => entreprise.domaines)
  @JoinTable()
  entreprises:Entreprise[]

  @OneToMany(()=>Job,(job)=>job.domaine)
  jobs:Job[]
}