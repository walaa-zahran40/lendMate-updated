import { MandateFee } from './mandate-fee.model';

export interface MandateFeesState {
  items: MandateFee[];
  history: MandateFee[];
  current?: MandateFee;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialMandateFeesState: MandateFeesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
