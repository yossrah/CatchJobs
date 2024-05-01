import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { City } from 'src/entities/city.entity';
import { Domaine } from 'src/entities/domaine.entity';
import { Entreprise } from 'src/entities/entreprise.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Job,City,Domaine,Entreprise,User])],
  providers: [JobsService],
  controllers: [JobsController]
})
export class JobsModule {}
