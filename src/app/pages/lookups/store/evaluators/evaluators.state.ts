import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Evaluator } from './evaluator.model';

export interface State extends EntityState<Evaluator> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Evaluator[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Evaluator> =
  createEntityAdapter<Evaluator>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
