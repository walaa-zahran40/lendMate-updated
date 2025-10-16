import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientOfficerType } from './client-officer-type.model';

export interface State extends EntityState<ClientOfficerType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: ClientOfficerType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<ClientOfficerType> =
  createEntityAdapter<ClientOfficerType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
