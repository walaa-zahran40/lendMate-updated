import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FollowupType } from './folllowup-type.model';

export interface State extends EntityState<FollowupType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: FollowupType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<FollowupType> =
  createEntityAdapter<FollowupType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
