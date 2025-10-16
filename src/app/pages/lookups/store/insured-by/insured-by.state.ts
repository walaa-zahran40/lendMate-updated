import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InsuredBy } from './insured-by.model';

export interface State extends EntityState<InsuredBy> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: InsuredBy[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<InsuredBy> =
  createEntityAdapter<InsuredBy>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
