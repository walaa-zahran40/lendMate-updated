import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FeeRange } from './fee-range.model';

export interface State extends EntityState<FeeRange> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: FeeRange[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<FeeRange> = createEntityAdapter<FeeRange>();

export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
