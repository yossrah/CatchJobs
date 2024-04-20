import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidaturesService } from './candidatures.service';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';

@Controller('candidatures')
export class CandidaturesController {
  constructor(private readonly candidaturesService: CandidaturesService) {}

  @Post()
  create(@Body() createCandidatureDto: CreateCandidatureDto) {
    return this.candidaturesService.create(createCandidatureDto);
  }

  @Get()
  findAll() {
    return this.candidaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidatureDto: UpdateCandidatureDto) {
    return this.candidaturesService.update(+id, updateCandidatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidaturesService.remove(+id);
  }
}
