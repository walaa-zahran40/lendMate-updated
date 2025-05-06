import { FeeType } from './fee-type.model';

export interface FeeTypesState {
  items: FeeType[];
  history: FeeType[];
  current?: FeeType;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialFeeTypesState: FeeTypesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
