import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { Entreprise } from "./entreprise.entity";

@Entity({name:"users"})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
  
    @Column({ type: 'varchar', length: 30})
    username: string;

  @OneToMany(()=>Job,(job)=>job.recruteur)
  jobs:Job[]

  @OneToOne(()=>Entreprise)
  @JoinColumn()
  entreprise:Entreprise;

  /*@OneToOne(()=>Profile) //pass a callback function that is supposed to return the entity that has relationship with
  @JoinColumn()
  profile:Profile*/
}