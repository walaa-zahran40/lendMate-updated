import { ActionAuthorizationGroup } from './action-authorization-group.model';

export interface ActionAuthorizationGroupsState {
  items: ActionAuthorizationGroup[];
  history: ActionAuthorizationGroup[];
  current?: ActionAuthorizationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialActionAuthorizationGroupsState: ActionAuthorizationGroupsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
