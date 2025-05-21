import { ClientShareHolder } from './client-share-holders.model';

export interface ClientShareHoldersState {
  items: ClientShareHolder[];
  history: ClientShareHolder[];
  current?: ClientShareHolder;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientShareHoldersState: ClientShareHoldersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
