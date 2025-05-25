import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FollowupType } from './folllowup-types.model';

export interface State extends EntityState<FollowupType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<FollowupType> =
  createEntityAdapter<FollowupType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
