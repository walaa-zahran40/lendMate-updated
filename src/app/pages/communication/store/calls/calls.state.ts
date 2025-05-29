import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Call } from './call.model';

export interface State extends EntityState<Call> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Call> =
  createEntityAdapter<Call>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
