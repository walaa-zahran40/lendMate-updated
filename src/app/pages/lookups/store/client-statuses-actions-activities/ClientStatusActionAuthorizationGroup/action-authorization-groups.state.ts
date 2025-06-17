import { ActionAuthorizationGroup } from './action-authorization-group.model';

export interface ActionAuthorizationGroupsState {
  items: ActionAuthorizationGroup[];
  history: ActionAuthorizationGroup[];
  current?: ActionAuthorizationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  historyLoaded: boolean;
  historyError: any;
}

export const initialActionAuthorizationGroupsState: ActionAuthorizationGroupsState =
  {
    items: [],
    current: undefined,
    loading: false,
    error: null,
    totalCount: 0,
    history: [],
    historyLoaded: false,
    historyError: null,
  };
