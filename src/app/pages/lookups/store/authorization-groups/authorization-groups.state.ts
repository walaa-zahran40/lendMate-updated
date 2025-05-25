import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuthorizationGroup } from './authorization-groups.model';

export interface State extends EntityState<AuthorizationGroup> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AuthorizationGroup> =
  createEntityAdapter<AuthorizationGroup>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
