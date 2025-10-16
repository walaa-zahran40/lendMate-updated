import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FirstClaimStatus } from './first-claim-status.model';

export interface State extends EntityState<FirstClaimStatus> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: FirstClaimStatus[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<FirstClaimStatus> =
  createEntityAdapter<FirstClaimStatus>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
