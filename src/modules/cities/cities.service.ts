import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

  constructor(@InjectRepository(City) private readonly cityRepository:Repository<City>){}
  async create(createCityDto: CreateCityDto):Promise<City> {
    const new_city=this.cityRepository.create({...createCityDto})
    return this.cityRepository.save(new_city)
  }

  async findAll():Promise<City[]> {
    const cities = await this.cityRepository.find()
    return cities;
  }

  async findOne(id: number):Promise<City> {
    const city = await this.cityRepository.findOneBy({id})
    return city
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update({id}, updateCityDto)
  }

  remove(id: number) {
    return this.cityRepository.delete({id})
  }
}
