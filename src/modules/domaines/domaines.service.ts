import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Domaine } from 'src/entities/domaine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DomainesService {

  constructor(@InjectRepository(Domaine) private readonly domainRepository:Repository<Domaine>){}
  
  async create(createDomaineDto: CreateDomaineDto):Promise<Domaine> {
    const new_domain=this.domainRepository.create({...createDomaineDto})
    return this.domainRepository.save(new_domain)
  }

  async findAll():Promise<Domaine[]> {
    const domaines=await this.domainRepository.find({relations:['entreprises','jobs']})
    return domaines
  }

  async findOne(id: number):Promise<Domaine> {
   const domain = await this.domainRepository.findOne({
    where: {
      id,
    },
    relations:['entreprises','jobs']
  })
   if (!domain) {
    throw new NotFoundException(`city with id ${id} not found`);
}
   return domain
  }

  update(id: number, updateDomaineDto: UpdateDomaineDto) {
    return this.domainRepository.update(id, updateDomaineDto)
  }

  remove(id: number) {
    return this.domainRepository.delete(id);
  }
}
