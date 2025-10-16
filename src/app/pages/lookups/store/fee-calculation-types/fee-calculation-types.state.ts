import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FeeCalculationType } from './fee-calculation-type.model';

export interface State extends EntityState<FeeCalculationType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: FeeCalculationType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<FeeCalculationType> =
  createEntityAdapter<FeeCalculationType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
