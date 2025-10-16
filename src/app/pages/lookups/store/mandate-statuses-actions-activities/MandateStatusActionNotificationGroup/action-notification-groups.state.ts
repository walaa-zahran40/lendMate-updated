import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MandateActionNotificationGroup } from './action-notification-group.model';

export interface MandateActionNotificationGroupsState {
  items: MandateActionNotificationGroup[];
  current?: MandateActionNotificationGroup;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  history: MandateActionNotificationGroup[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<MandateActionNotificationGroup> =
  createEntityAdapter<MandateActionNotificationGroup>();
export const initialActionNotificationGroupsState: MandateActionNotificationGroupsState =
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
