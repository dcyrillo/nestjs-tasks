import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../DTO/create-task.DTO';
import { GetTasksFiltersDto } from '../DTO/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation-pipes';
import 'reflect-metadata';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksServices: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksServices.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksServices.getTaskById(id);
  }
  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksServices.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', new TaskStatusValidationPipe()) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksServices.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filtersDto: GetTasksFiltersDto,
  ): Promise<Task[]> {
    return this.tasksServices.getTask(filtersDto);
  }
}
