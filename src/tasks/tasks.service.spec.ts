import { TaskStatus } from './task-status.enum';
import { GetTasksFiltersDto } from 'src/DTO/get-task-filter.dto';
import { TasksService } from './tasks.service';
import { Test } from '@nestjs/testing';
import { async } from 'rxjs/internal/scheduler/async';
import { TaskRepository } from './task.repository';

const result = { username: 'Test user' };
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let tasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get<TasksService>(tasksService);
    tasksRepository = await module.get<TaskRepository>(TaskRepository);
  });
  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {});
    tasksRepository.getTasks.mockResolvedValue('someValue');
    expect(tasksRepository.getTasks).not.toHaveBeenCalled();
    const filters: GetTasksFiltersDto = {
      status: TaskStatus.DONE,
      search: 'Some search query',
    };
    tasksService.getTasks(filters, result);
    expect(tasksRepository.getTasks).toHaveBeenCalled();
    expect(result).toEqual('someValue');
  });
});
