import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FeeType } from './fee-type.model';

export interface State extends EntityState<FeeType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: FeeType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<FeeType> = createEntityAdapter<FeeType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
