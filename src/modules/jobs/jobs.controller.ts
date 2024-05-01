import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from 'src/entities/job.entity';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobsService:JobsService){}

    @Get()
    findAll(@Query('currentPage') currentPage:number=1):Promise<Job[]>{
      return this.jobsService.findAllJobs(currentPage)
    }

    @Get('/countAll')
    countAll(){
    return this.jobsService.countAll();
    }

    @Get('/countByDomain/:domainId')
    countByDomain(@Param('domainId', ParseIntPipe) domainId: number){
        return this.jobsService.countByDomain(domainId)
    }

    @Get('/getJobs/:cityId')
    findJobsByCity(@Param('cityId',ParseIntPipe) cityId:number,@Query('currentPage') currentPage:number=1):Promise<Job[]>{
      return this.jobsService.findJobsByCity(cityId,currentPage)
    }

    @Get('/getJobs/:domainId')
    findJobsByDomain(@Param('domainId',ParseIntPipe) domainId:number,@Query('currentPage') currentPage:number=1):Promise<Job[]>{
      return this.jobsService.findJobsByDomain(domainId,currentPage)
    }

    @Get('/getJobsbyUser/')
    findJobsByUser(@GetUser() user:User ,@Query('currentPage') currentPage:number=1):Promise<Job[]>{
      return this.jobsService.findJobsByUser(user,currentPage)
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe)id:number):Promise<Job>{
        return this.jobsService.findOneJob(id)
    }

    @Post()
    createJob(@GetUser() user:User,@Body() createJobDto:CreateJobDto):Promise<Job>{
      return this.jobsService.createJob(user,createJobDto)
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
