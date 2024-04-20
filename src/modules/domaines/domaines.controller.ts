import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { CreateDomaineDto } from './dto/create-domaine.dto';
import { UpdateDomaineDto } from './dto/update-domaine.dto';

@Controller('domaines')
export class DomainesController {
  constructor(private readonly domainesService: DomainesService) {}

  @Post()
  create(@Body() createDomaineDto: CreateDomaineDto) {
    return this.domainesService.create(createDomaineDto);
  }

  @Get()
  findAll() {
    return this.domainesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomaineDto: UpdateDomaineDto) {
    return this.domainesService.update(+id, updateDomaineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainesService.remove(+id);
  }
}
