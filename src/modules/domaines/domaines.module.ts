import { Module } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { DomainesController } from './domaines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domaine } from 'src/entities/domaine.entity';
import { Job } from 'src/entities/job.entity';
import { Entreprise } from 'src/entities/entreprise.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Domaine,Job,Entreprise])],
  controllers: [DomainesController],
  providers: [DomainesService],
})
export class DomainesModule {}
