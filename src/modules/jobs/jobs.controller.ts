import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from 'src/entities/job.entity';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobsService:JobsService){}

    @Get()
    findAll():Promise<Job[]>{
      return this.jobsService.findAllJobs()
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe)id:number):Promise<Job>{
        return this.jobsService.findOneJob(id)
    }

    @Post()
    createJob(@Body() createJobDto:CreateJobDto):Promise<Job>{
      return this.jobsService.createJob(createJobDto)
    }

    @Patch(':id')
    updateJob(@Param('id', ParseIntPipe) id: number, updateJobDto:UpdateJobDto){
          return this.jobsService.updateJob(id,updateJobDto)
    }

    @Delete(':id')
    deleteJob(@Param('id', ParseIntPipe) id: number){
        return this.jobsService.deleteJob(id)
    }
}
