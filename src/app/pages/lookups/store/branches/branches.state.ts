import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Branch } from './branch.model';

export interface State extends EntityState<Branch> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Branch> = createEntityAdapter<Branch>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
