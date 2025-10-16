import { FollowupPoint } from './followup-point.model';

export interface FollowupPointsState {
  items: FollowupPoint[];
  history: FollowupPoint[];
  current?: FollowupPoint;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialFollowupPointsState: FollowupPointsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
