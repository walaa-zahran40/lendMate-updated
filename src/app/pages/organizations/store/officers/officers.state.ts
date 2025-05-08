import { Officer } from './officer.model';

export interface OfficersState {
  items: Officer[];
  history: Officer[];
  current?: Officer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialOfficersState: OfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
