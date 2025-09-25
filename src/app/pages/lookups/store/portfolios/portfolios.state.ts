import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Portfolio } from './portfolio.model';

export interface State extends EntityState<Portfolio> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Portfolio[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Portfolio> =
  createEntityAdapter<Portfolio>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
