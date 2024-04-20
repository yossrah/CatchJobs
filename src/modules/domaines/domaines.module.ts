import { Module } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { DomainesController } from './domaines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domaine } from 'src/entities/domaine.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Domaine])],
  controllers: [DomainesController],
  providers: [DomainesService],
})
export class DomainesModule {}
