import { ActionNotificationGroup } from './action-notification-group.model';

export interface ActionNotificationGroupsState {
  items: ActionNotificationGroup[];
  history: ActionNotificationGroup[];
  current?: ActionNotificationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  historyLoaded: boolean;
  historyError: any;
}

export const initialActionNotificationGroupsState: ActionNotificationGroupsState =
  {
    items: [],
    history: [],
    historyLoaded: false,
    historyError: null,
    current: undefined,
    loading: false,
    error: null,
    totalCount: 0,
  };
