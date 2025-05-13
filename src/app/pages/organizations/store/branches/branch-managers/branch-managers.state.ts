import { BranchManager } from './branch-manager.model';

export interface BranchManagersState {
  items: BranchManager[];
  history: BranchManager[];
  current?: BranchManager;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialBranchManagersState: BranchManagersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
