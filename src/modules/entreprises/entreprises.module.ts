import { Module } from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { EntreprisesController } from './entreprises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entreprise } from 'src/entities/entreprise.entity';
import { City } from 'src/entities/city.entity';
import { Domaine } from 'src/entities/domaine.entity';
import { Job } from 'src/entities/job.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Entreprise,City,Domaine,Job])
  ],
  controllers: [EntreprisesController],
  providers: [EntreprisesService],
})
export class EntreprisesModule {}
