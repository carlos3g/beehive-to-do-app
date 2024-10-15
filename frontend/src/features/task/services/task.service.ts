import type {
  CreateTaskOutput,
  CreateTaskPayload,
  GetTaskOutput,
  GetTaskPayload,
  ListTasksOutput,
  ListTasksPayload,
  TaskServiceContract,
  UpdateTaskOutput,
  UpdateTaskPayload,
} from '@/features/task/contracts/task-service.contract';
import type { HttpClientServiceContract } from '@/shared/contracts/http-client-service.contract';

export class TaskService implements TaskServiceContract {
  constructor(private readonly httpClientService: HttpClientServiceContract) {}

  public create(payload: CreateTaskPayload): Promise<CreateTaskOutput> {
    return this.httpClientService.post<CreateTaskOutput, CreateTaskPayload>('/tasks', payload);
  }

  public update(id: number, payload: UpdateTaskPayload): Promise<UpdateTaskOutput> {
    return this.httpClientService.patch<UpdateTaskOutput, UpdateTaskPayload>(`/tasks/${id}`, payload);
  }

  public get(id: number): Promise<GetTaskOutput> {
    return this.httpClientService.get<GetTaskOutput, GetTaskPayload>(`/tasks/${id}`, {});
  }

  public list(payload: ListTasksPayload): Promise<ListTasksOutput> {
    return this.httpClientService.get<ListTasksOutput, ListTasksPayload>('/tasks', {
      ...payload,
    });
  }

  public delete(id: number): Promise<unknown> {
    return this.httpClientService.delete(`/tasks/${id}`);
  }
}
