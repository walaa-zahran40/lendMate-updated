import { DepartmentManager } from './department-manager.model';

export interface DepartmentManagersState {
  items: DepartmentManager[];
  history: DepartmentManager[];
  current?: DepartmentManager;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialDepartmentManagersState: DepartmentManagersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
