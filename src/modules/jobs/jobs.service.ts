import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';
import { User } from 'src/entities/user.entity';
import { Domaine } from 'src/entities/domaine.entity';

@Injectable()
export class JobsService {
    constructor(@InjectRepository(Job) private readonly jobsRepository:Repository<Job>,
    @InjectRepository(Domaine) private readonly domainsRepository:Repository<Domaine>){}

    async createJob(user:User, createJobDto:CreateJobDto):Promise<Job>{
        const id=createJobDto.domaine.id
            const existDomain=await this.domainsRepository.findOneBy({id})
            if(!existDomain){
                throw new HttpException('Domaine not found cannot create job', HttpStatus.BAD_REQUEST)
            }
        const new_job=this.jobsRepository.create({...createJobDto,
           recruteur:user,
           entreprise:user.entreprise,
           CreatedAt: new Date(),
           isAvailable: true,
        })
        return await this.jobsRepository.save(new_job)
      
    }
   async findAllJobs(currentPage:number):Promise<Job[]>{
        const resPerPage = 3
        const skip = resPerPage * (currentPage - 1)
        const jobs =await this.jobsRepository.find({relations:['entreprise','recruteur','city','domaine'],
            skip:skip,
            take:resPerPage
        })
        return jobs;

    }
    async findOneJob(id:number):Promise<Job>{
      const job=await this.jobsRepository.findOne({ where: {
        id,
      },
      relations:['entreprise','recruteur','city','domaine']})
      if (!job) {
        throw new NotFoundException(`not found`);
    }
      return job
    }
    async updateJob(id:number,job:UpdateJobDto){
        return await this.jobsRepository.update(id,job)
    }
    async deleteJob(id:number){
        return await this.jobsRepository.delete(id)
    }

    async countAll(): Promise<number> {
        try {
          const count = await this.jobsRepository.count();
          return count;
        } catch (error) {
          throw new Error(`Failed to count users: ${error.message}`)
        }
      }

   async countByDomain(domainId:number): Promise<number> {
    try {
        const count = await this.jobsRepository.count({ where: { domaine: { id: domainId } } });
        return count;
    } catch (error) {
        throw new Error(`Failed to count jobs by domain: ${error.message}`);
    }
}

   async findJobsByCity(cityId:number,currentPage:number){
    const resPerPage = 3
    const skip = resPerPage * (currentPage - 1)
    const jobs=await this.jobsRepository.find({relations:['entreprise','recruteur','city','domaine'],
        where:{city:{id:cityId}},
        skip:skip,
        take:resPerPage
    })
    return jobs;
}
  async findJobsByDomain(domainId:number,currentPage:number){
    const resPerPage = 3
    const skip = resPerPage * (currentPage - 1)
    const jobs=await this.jobsRepository.find({relations:['entreprise','recruteur','city','domaine'],
        where:{domaine:{id:domainId}},
        skip:skip,
        take:resPerPage
    })
    return jobs;
  }

  async findJobsByUser(user:User,currentPage:number):Promise<Job[]> {
    const resPerPage = 3
    const skip = resPerPage * (currentPage - 1)
    const jobs=await this.jobsRepository.find({relations:['entreprise','recruteur','city','domaine'],
        where:{recruteur:{id:user.id}},
        skip:skip,
        take:resPerPage
    })
    return jobs;

   }

}