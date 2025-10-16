import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NotificationGroupOfficer } from './notification-group-officer.model';

export interface State extends EntityState<NotificationGroupOfficer> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: NotificationGroupOfficer[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<NotificationGroupOfficer> =
  createEntityAdapter<NotificationGroupOfficer>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
