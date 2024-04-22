import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { Entreprise } from 'src/entities/entreprise.entity';
import { CreateDomaineDto } from '../domaines/dto/create-domaine.dto';

@Controller('entreprises')
export class EntreprisesController {
  constructor(private readonly entreprisesService: EntreprisesService) {}

  @Post()
  create(@Body() createEntrepriseDto: CreateEntrepriseDto):Promise<Entreprise> {
    return this.entreprisesService.create(createEntrepriseDto);
  }

  @Get()
  findAll(@Query('domain') domain:string, @Query('city') city:string, @Query('currentPage') currentPage:number=1):Promise<Entreprise []> {
    return this.entreprisesService.findAll(domain, city, currentPage);
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

  @Post('pushdomain/:id')
  pushDomaine(@Param('id',ParseIntPipe) id: number, @Body() pushdomain: CreateDomaineDto) {
    console.log('id',id)
    return this.entreprisesService.pushDomaine(id, pushdomain);
  }
}
