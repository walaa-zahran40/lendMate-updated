import { Department } from './department.model';

export interface DepartmentsState {
  items: Department[];
  history: Department[];
  current?: Department;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialDepartmentsState: DepartmentsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
