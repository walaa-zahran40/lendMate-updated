import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateStatus } from './mandate-status.model';

export interface MandateStatusesState {
  items: MandateStatus[];
  current?: MandateStatus;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  history: MandateStatus[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<MandateStatus> =
  createEntityAdapter<MandateStatus>();
export const initialMandateStatusesState: MandateStatusesState = {
  items: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
  history: [],
  historyLoaded: false,
  historyError: null,
};
