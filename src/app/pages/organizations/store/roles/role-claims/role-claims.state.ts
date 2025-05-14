import { BranchAddress } from './role-claim.model';

export interface BranchAddressesState {
  items: BranchAddress[];
  history: BranchAddress[];
  current?: BranchAddress;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialBranchAddressesState: BranchAddressesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
