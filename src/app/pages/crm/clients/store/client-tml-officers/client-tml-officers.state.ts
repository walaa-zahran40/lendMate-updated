import { ClientTMLOfficer } from './client-tml-officer.model';

export interface ClientTMLOfficersState {
  items: ClientTMLOfficer[];
  history: ClientTMLOfficer[];
  current?: ClientTMLOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientTMLOfficersState: ClientTMLOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
