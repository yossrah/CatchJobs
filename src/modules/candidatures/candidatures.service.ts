import { Injectable } from '@nestjs/common';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';

@Injectable()
export class CandidaturesService {
  create(createCandidatureDto: CreateCandidatureDto) {
    return 'This action adds a new candidature';
  }

  findAll() {
    return `This action returns all candidatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidature`;
  }

  update(id: number, updateCandidatureDto: UpdateCandidatureDto) {
    return `This action updates a #${id} candidature`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidature`;
  }
}
