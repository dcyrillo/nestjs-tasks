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


 /*  getAllTasks():Task[]{
       return this.tasks;
   }
*/
    /*
   getTaskById(id:string):Task{
    const found= this.tasks.find(task=>task.id==id);
    if(!found){
       throw new  NotFoundException("task not found dudu cyrillo");
    }
    
    return found;
    
}
   deleteTask(id:string):void{
 
   const found=this.getTaskById(id);
   this.tasks = this.tasks.filter(task =>task.id !==found.id);
    
   }
   updateTaskStatus(id:string,status:TaskStatus):Task{
    
    const task= this.getTaskById(id);
    task.status=status; 
    return task;
   }
   getTaskWithFilters(filterDto:GetTasksFiltersDto){
        const {status,search}=filterDto;
        let tasks=this.getAllTasks();
        if(status){
            tasks=tasks.filter(task=> task.status==status);
        }
        if(search){
            tasks=tasks.filter(task=> task.title.includes(search)||task.descricao.includes(search));
        }
        
        return tasks;

   }
   createTask(createTaskDto:CreateTaskDto):Task{
    const {title,descricao}= createTaskDto;  
    const task:Task={
          
          id:uuid(), 
          title,
          descricao,
          status:TaskStatus.DONE,
      };
      this.tasks.push(task);
    return task;

   }*/
}
