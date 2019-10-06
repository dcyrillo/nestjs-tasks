import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from 'src/DTO/create-task.DTO';
import { GetTasksFiltersDto } from "src/DTO/get-task-filter.dto";


@EntityRepository(Task)
export class TaskRepository extends Repository <Task>{

    async getTasks (filterDto:GetTasksFiltersDto):Promise<Task[]>{
        const{status,search}=filterDto;
        const query=this.createQueryBuilder('task');
        if (status){
            query.andWhere('task.status=:status',{status});
        }
        if (search){
            query.andWhere('task.title:search OR task.descricao LIKE search',{search});
        }
        const tasks=await query.getMany();
        return tasks; 
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
    
}