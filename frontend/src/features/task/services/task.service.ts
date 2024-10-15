import type {
  GetTaskOutput,
  GetTaskPayload,
  ListTasksOutput,
  ListTasksPayload,
  TaskServiceContract,
} from '@/features/task/contracts/task-service.contract';
import type { HttpClientServiceContract } from '@/shared/contracts/http-client-service.contract';

export class TaskService implements TaskServiceContract {
  constructor(private readonly httpClientService: HttpClientServiceContract) {}

  public get(uuid: string): Promise<GetTaskOutput> {
    return this.httpClientService.get<GetTaskOutput, GetTaskPayload>(`/tasks/${uuid}`, {});
  }

  public list(payload: ListTasksPayload): Promise<ListTasksOutput> {
    return this.httpClientService.get<ListTasksOutput, ListTasksPayload>('/tasks', {
      ...payload,
    });
  }
}
