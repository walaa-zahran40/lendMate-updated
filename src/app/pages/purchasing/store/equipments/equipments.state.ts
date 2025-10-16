import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Equipment } from './equipment.model';

export interface State extends EntityState<Equipment> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Equipment[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Equipment> =
  createEntityAdapter<Equipment>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
