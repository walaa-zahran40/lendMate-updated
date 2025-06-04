import { Followup } from './followup.model';

export interface FollowupsState {
  items: Followup[];
  history: Followup[];
  current?: Followup;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialFollowupsState: FollowupsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
