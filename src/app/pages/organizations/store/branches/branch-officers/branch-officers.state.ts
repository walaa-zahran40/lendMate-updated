import { BranchOfficer } from './branch-officer.model';

export interface BranchOfficersState {
  items: BranchOfficer[];
  history: BranchOfficer[];
  current?: BranchOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialBranchOfficersState: BranchOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
