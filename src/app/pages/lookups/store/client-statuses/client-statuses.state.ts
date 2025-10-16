import { ClientStatus } from './client-status.model';

export interface ClientStatusesState {
  items: ClientStatus[];
  history: ClientStatus[];
  current?: ClientStatus;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  historyLoaded: boolean;
  historyError: any;
}

export const initialClientStatusesState: ClientStatusesState = {
  items: [],
  history: [],
  historyLoaded: false,
  historyError: null,
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
