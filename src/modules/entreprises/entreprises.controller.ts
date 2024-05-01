import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { Entreprise } from 'src/entities/entreprise.entity';
import { CreateDomaineDto } from '../domaines/dto/create-domaine.dto';
import { CreateCityDto } from '../cities/dto/create-city.dto';

@Controller('entreprises')
export class EntreprisesController {
  constructor(private readonly entreprisesService: EntreprisesService) {}

  @Post()
  create(@Body() createEntrepriseDto: CreateEntrepriseDto):Promise<Entreprise> {
    return this.entreprisesService.create(createEntrepriseDto);
  }

  @Get()
  findAll(@Query('name') name:string , @Query('domain') domain:string, @Query('city') city:string='', @Query('currentPage') currentPage:number=1):Promise<Entreprise []> {
    return this.entreprisesService.findAll(name,domain, city, currentPage);
  }

  @Get('/job/:id')
  findByJob(@Param('id',ParseIntPipe) id: number):Promise<Entreprise[]> {
    return this.entreprisesService.findByjob(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Entreprise> {
    return this.entreprisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateEntrepriseDto: UpdateEntrepriseDto) {
    return this.entreprisesService.update(id, updateEntrepriseDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.entreprisesService.remove(id);
  }

  @Put('pushdomain/:id')
  pushDomaine(@Param('id',ParseIntPipe) id: number, @Body() pushdomain: CreateDomaineDto) {
    console.log('id',id)
    return this.entreprisesService.pushDomaine(id, pushdomain);
  }

  @Put('pulldomain/:id')
  pullDomaine(@Param('id',ParseIntPipe) id: number, @Body() pulldomain: CreateDomaineDto) {
    return this.entreprisesService.pullDomaine(id, pulldomain);
  }

  @Put('pushcity/:id')
  pushCity(@Param('id',ParseIntPipe) id: number, @Body() city: CreateCityDto ) {
    return this.entreprisesService.pushCity(id, city);
  }

  @Put('pullcity/:id')
  pullCity(@Param('id',ParseIntPipe) id: number, @Body() city:CreateCityDto ) {
    return this.entreprisesService.pullCity(id, city);
  }
}
