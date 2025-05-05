import { Governorate } from './governorate.model';

export interface GovernoratesState {
  items: Governorate[];
  history: Governorate[];
  current?: Governorate;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialGovernoratesState: GovernoratesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
