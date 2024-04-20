import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"domaines"})
export class Domaine extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  name: string;
}