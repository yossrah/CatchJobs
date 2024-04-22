import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { Job } from 'src/entities/job.entity';

@Module({
  imports:[TypeOrmModule.forFeature([City,Job])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
