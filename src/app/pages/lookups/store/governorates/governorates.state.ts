import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Governorate } from './governorate.model';

export interface State extends EntityState<Governorate> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Governorate[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Governorate> =
  createEntityAdapter<Governorate>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
