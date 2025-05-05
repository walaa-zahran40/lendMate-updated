import { MandateStatus } from './mandate-status.model';

export interface MandateStatusesState {
  items: MandateStatus[];
  history: MandateStatus[];
  current?: MandateStatus;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialMandateStatusesState: MandateStatusesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
