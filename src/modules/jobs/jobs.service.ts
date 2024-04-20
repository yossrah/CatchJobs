import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';

@Injectable()
export class JobsService {
    constructor(@InjectRepository(Job) private readonly jobsRepository:Repository<Job>){}

    async createJob(createJobDto:CreateJobDto):Promise<Job>{
        const new_job=this.jobsRepository.create({...createJobDto,
           CreatedAt: new Date(),
           isAvailable: true,
        })
        return await this.jobsRepository.save(new_job)
      
    }
   async findAllJobs():Promise<Job[]>{
        const jobs =await this.jobsRepository.find()
        return jobs;

    }
    async findOneJob(id:number):Promise<Job>{
      const job=await this.jobsRepository.findOneBy({id})
      return job
    }
    async updateJob(id:number,job:UpdateJobDto){
        return await this.jobsRepository.update(id,job)
    }
    async deleteJob(id:number){
        return await this.jobsRepository.delete(id)
    }
}
