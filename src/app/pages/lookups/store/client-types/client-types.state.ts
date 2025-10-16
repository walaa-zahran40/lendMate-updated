import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientType } from './client-type.model';

export interface State extends EntityState<ClientType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: ClientType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<ClientType> =
  createEntityAdapter<ClientType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
