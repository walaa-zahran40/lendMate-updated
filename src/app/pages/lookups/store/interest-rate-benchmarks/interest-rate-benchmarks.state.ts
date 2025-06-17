import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InterestRateBenchMark } from './interest-rate-benchmark.model';

export interface State extends EntityState<InterestRateBenchMark> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: InterestRateBenchMark[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<InterestRateBenchMark> =
  createEntityAdapter<InterestRateBenchMark>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
