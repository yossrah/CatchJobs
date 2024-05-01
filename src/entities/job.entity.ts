import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";
import { Domaine } from "./domaine.entity";
import { Entreprise } from "./entreprise.entity";
import { User } from "./user.entity";

@Entity({name:"jobs"})
export class Job extends BaseEntity{

  @PrimaryGeneratedColumn({type:"bigint"})
  id:number

  @Column({ type: 'varchar', length: 30})
  title: string;

  @Column({ type: 'varchar'})
  description: string;

  @Column({ type: 'varchar'})
  exigences: string;

  @Column({ type: 'varchar'})
  technologies: string;

  @Column({ type: 'varchar'})
  langues: string;

  @Column({ type: 'varchar'})
  type_contrat: string;

  @Column({ type: 'int' })
  nb_postes: number;

  @Column({ type: 'int' })
  salaire: number;

  @Column({default:true})
  isAvailable: Boolean;

  @Column()
  CreatedAt:Date

  @Column()
  ExpiresAt:Date

  //author,domaine,entreprice,recommandations/candidatures

  @ManyToOne(()=>City,(city)=>city.jobs)
  city:City

  @ManyToOne(()=>Domaine,(domaine)=>domaine.jobs)
  domaine:Domaine

  @ManyToOne(()=>Entreprise,(entreprise)=>entreprise.jobs)
  entreprise:Entreprise

  @ManyToOne(()=>User,(user)=>user.jobs)
  recruteur:User
}