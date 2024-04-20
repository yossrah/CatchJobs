import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"cities"})
export class City extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  city: string;
}