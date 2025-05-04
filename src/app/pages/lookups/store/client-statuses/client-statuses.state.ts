import { ClientStatus } from './client-status.model';

export interface ClientStatusesState {
  items: ClientStatus[];
  history: ClientStatus[];
  current?: ClientStatus;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientStatusesState: ClientStatusesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
