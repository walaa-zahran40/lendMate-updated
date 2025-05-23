import { ClientOfficer } from './client-officer.model';

export interface ClientOfficersState {
  items: ClientOfficer[];
  history: ClientOfficer[];
  current?: ClientOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientOfficersState: ClientOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
