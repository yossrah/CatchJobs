import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entreprise } from 'src/entities/entreprise.entity';
import { Repository } from 'typeorm';
import { City } from 'src/entities/city.entity';
import { Domaine } from 'src/entities/domaine.entity';
import { CreateDomaineDto } from '../domaines/dto/create-domaine.dto';

@Injectable()
export class EntreprisesService {

  constructor(@InjectRepository(Entreprise) private readonly entrepriseRepository: Repository<Entreprise>,
  @InjectRepository(City) private readonly cityRepository: Repository<City>,
  @InjectRepository(Domaine) private readonly domainRepository: Repository<Domaine>
){}
  async create(createEntrepriseDto: CreateEntrepriseDto):Promise<Entreprise>
   {
    const {id}=createEntrepriseDto.city
    const existcity = await this.cityRepository.findOneBy( {id})
    if (!existcity) {
      throw new HttpException('City not found cannot create profile', HttpStatus.BAD_REQUEST)
    }
    const new_entreprise=this.entrepriseRepository.create({...createEntrepriseDto})
    return await this.entrepriseRepository.save(new_entreprise)
  }

  async findAll(domain:string, city:string, currentPage:number):Promise<Entreprise[]> {
    const resPerPage = 7
    const skip = resPerPage * (currentPage - 1)
    const queryBuilder = this.entrepriseRepository.createQueryBuilder('entreprise')
        .leftJoinAndSelect('entreprise.city', 'city')
        .andWhere('city.city = :city', { city: city })
        .take(resPerPage)
        .skip(skip);

    const entreprises = await queryBuilder.getMany();
    return entreprises;
  }

  async findOne(id: number):Promise<Entreprise> {
    const entreprise=await this.entrepriseRepository.findOne({
      where: {
        id,
      },
      relations:['city','domaines','jobs']
    })
    if (!entreprise) {
      throw new NotFoundException(`city with id ${id} not found`);
  }
    return entreprise
  }

  update(id: number, updateEntrepriseDto: UpdateEntrepriseDto) {
    return this.entrepriseRepository.update({id}, updateEntrepriseDto)
  }

  remove(id: number) {
    this.entrepriseRepository.delete({id})
  }

  async pushDomaine(id: number,pushdomain:CreateDomaineDto):Promise<Entreprise> {
    const entreprise=await this.entrepriseRepository.findOneBy({id})
    if (!entreprise) {
      throw new NotFoundException(`city with id ${id} not found`);
  }
    const domain=await this.domainRepository.findOneBy(pushdomain)
    //console.log(pushdomain)
    if (!domain) {
      throw new NotFoundException(`domain with name ${pushdomain} not found`);
    }
    //entreprise.domaines.push([...City,domain])
    return await this.entrepriseRepository.save(entreprise)
  }
}
