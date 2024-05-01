import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entreprise } from 'src/entities/entreprise.entity';
import { Repository } from 'typeorm';
import { City } from 'src/entities/city.entity';
import { Domaine } from 'src/entities/domaine.entity';
import { CreateDomaineDto } from '../domaines/dto/create-domaine.dto';
import { CreateCityDto } from '../cities/dto/create-city.dto';

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

  async findAll(name:string ,domain:string, city:string, currentPage:number):Promise<Entreprise[]> {
    const resPerPage = 3
    const skip = resPerPage * (currentPage - 1)
    //Query builder is a mechanism to interact with db and used build complex SQL queries in an easy way
    // 'entreprise' refer to the entreprise entity.
    //andWhere and not where to make them works together
    let queryBuilder= this.entrepriseRepository.createQueryBuilder('entreprise')
    if (city) {
      const existcity=await this.cityRepository.findOneBy({city})
      if(!existcity){
        throw new HttpException('City not found', HttpStatus.BAD_REQUEST)
      }
      
      queryBuilder = queryBuilder
      //.leftJoinAndSelect('entreprise.city', 'city')
                   //.leftJoinAndSelect('entreprise.domaines', 'domaines')
                   .andWhere('city.id = :cityId', {cityId: existcity.id});
    }
    if (domain) {
      const existdomain=await this.domainRepository.findOneBy({name:domain})
      if(!existdomain){
        throw new HttpException('Domain not found', HttpStatus.BAD_REQUEST)
      }
      
      queryBuilder = queryBuilder
      //.leftJoinAndSelect('entreprise.domaines', 'domaines')
                   // .leftJoinAndSelect('entreprise.city', 'city')
                   .andWhere('domaines.id = :domainId', {domainId: existdomain.id});
    }
   /* if (name) {
      queryBuilder = queryBuilder
      //.leftJoinAndSelect('entreprise.name', 'name')
                   .andWhere('entreprise.name LIKE :name OR entreprise.localisation LIKE name', {name});
    }*/
    const [entreprises,totalCount]=await queryBuilder
    .leftJoinAndSelect('entreprise.city', 'city')
   .leftJoinAndSelect('entreprise.domaines', 'domaines')
   .skip(skip)
   .take(resPerPage)
    .getManyAndCount()
    return entreprises
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
    const entreprise=await this.entrepriseRepository.findOne({where: {
      id,
    },
    relations:['domaines']})
    if (!entreprise) {
      throw new NotFoundException(`city with id ${id} not found`);
  }
    const domain=await this.domainRepository.findOneBy(pushdomain)
    console.log(domain)
    if (!domain) {
      throw new NotFoundException(`domain with name ${pushdomain} not found`);
    }
    const domaines: Domaine[] = entreprise.domaines;
    console.log(domaines)
    entreprise.domaines.push(domain)
    return await this.entrepriseRepository.save(entreprise)
  }

  async pullDomaine(id: number,pulldomain:CreateDomaineDto):Promise<Entreprise> {
    const entreprise=await this.entrepriseRepository.findOne({where: {
      id,
    },
    relations:['domaines']})
     if (!entreprise) {
      throw new NotFoundException(`city with id ${id} not found`);
    }
    const domain=await this.domainRepository.findOneBy(pulldomain)
    //console.log(pushdomain)
    if (!domain) {
      throw new NotFoundException(`domain with name ${pulldomain} not found`);
    }
    entreprise.domaines.splice(domain.id-1,1)
    console.log(entreprise.domaines)
    return await this.entrepriseRepository.save(entreprise)
  }

  async pushCity(id: number,city:CreateCityDto):Promise<Entreprise> {
    const entreprise=await this.entrepriseRepository.findOne({where: {
      id,
    },
    relations:['city']})
    if (!entreprise) {
      throw new NotFoundException(`entreprise not found`);
  }
    const existcity=await this.cityRepository.findOneBy(city)
    if (!existcity) {
      throw new NotFoundException(`city with name ${city} not found`);
    }
    entreprise.city=existcity
    return await this.entrepriseRepository.save(entreprise)
  }

  async pullCity(id: number,city:CreateCityDto):Promise<Entreprise> {
    const entreprise=await this.entrepriseRepository.findOne({where: {
      id,
    },
    relations:['city']})
     if (!entreprise) {
      throw new NotFoundException(`entreprise not found`);
    }
    console.log(entreprise)
    const existcity=await this.cityRepository.findOneBy(city)
    //console.log(pushdomain)
    if (!existcity) {
      throw new NotFoundException(`city not found`);
    }
    //console.log("entrepriseCity",entreprise.city.id==existcity.id)
    if(entreprise.city.id!==existcity.id){
      throw new NotFoundException(`city not found`);
    }
    entreprise.city=null
    return await this.entrepriseRepository.save(entreprise)
  }

  async findByjob(id:number):Promise<Entreprise[]>{
    const entreprise=await this.entrepriseRepository.find({
      relations:['City','domaines']
    })
    if (!entreprise) {
      throw new NotFoundException(`city with id ${id} not found`);
  }
  return entreprise
}
}
