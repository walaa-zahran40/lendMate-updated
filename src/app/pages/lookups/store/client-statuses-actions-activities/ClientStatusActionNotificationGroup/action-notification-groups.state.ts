import { ActionNotificationGroup } from './action-notification-group.model';

export interface ActionNotificationGroupsState {
  items: ActionNotificationGroup[];
  history: ActionNotificationGroup[];
  current?: ActionNotificationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialActionNotificationGroupsState: ActionNotificationGroupsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
