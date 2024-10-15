import type { FilterTasksQuery } from '@app/modules/task/dtos/filter-tasks-query';
import type { Paginate } from '@app/shared/dtos/paginate';

export interface ListPaginatedTasksQuery {
  paginate?: Paginate;
  filters?: FilterTasksQuery;
}
