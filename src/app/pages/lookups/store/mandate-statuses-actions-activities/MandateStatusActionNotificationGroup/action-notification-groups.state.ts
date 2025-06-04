import { MandateActionNotificationGroup } from './action-notification-group.model';

export interface MandateActionNotificationGroupsState {
  items: MandateActionNotificationGroup[];
  history: MandateActionNotificationGroup[];
  current?: MandateActionNotificationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialActionNotificationGroupsState: MandateActionNotificationGroupsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
