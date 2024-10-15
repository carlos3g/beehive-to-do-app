import type { TaskServiceContract } from '@/features/task/contracts/task-service.contract';
import { TaskService } from '@/features/task/services/task.service';
import { httpClientService } from '@/shared/services';

const taskService: TaskServiceContract = new TaskService(httpClientService);

export { taskService };
