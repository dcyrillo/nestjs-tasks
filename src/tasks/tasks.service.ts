import { Injectable, GoneException, NotFoundException, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetTasksFiltersDto } from 'src/DTO/get-task-filter.dto';
import { InjectRepository, handleRetry } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from 'src/DTO/create-task.DTO';


@Injectable()
export class TasksService {
 
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}
    async getTask(filterDto:GetTasksFiltersDto):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }
    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
    
        const {title,descricao}=createTaskDto;
        const task = new Task();
        task.title=title;
        
        task.descricao=descricao;
        task.status=TaskStatus.IN_PROGRESS;
        await task.save();
        
        return task;
        }
     async getTaskById(id:number):Promise<Task>{
         const found = this.taskRepository.findOne(id);
         if(!found){
             throw new NotFoundException("task not found");
         }
         return found;
     }


   async deleteTask(id:number):Promise<void>{
       const result= await this.taskRepository.delete(id);
        console.log(result)

        if(result.affected==0){
            throw new NotFoundException('task not found');
        }
    }
    async updateTaskStatus(id:number,status:TaskStatus):Promise<Task>{
    const task=await this.getTaskById(id);
           task.status=status;
            await task.save();
            return task;
        }


}
