import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NotificationGroup } from './notification-group.model';

export interface State extends EntityState<NotificationGroup> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: NotificationGroup[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<NotificationGroup> =
  createEntityAdapter<NotificationGroup>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
