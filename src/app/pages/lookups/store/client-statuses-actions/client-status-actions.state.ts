import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientStatusAction } from './client-status-action.model';

export interface State extends EntityState<ClientStatusAction> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: ClientStatusAction[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<ClientStatusAction> =
  createEntityAdapter<ClientStatusAction>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
