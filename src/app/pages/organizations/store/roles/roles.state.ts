import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Role } from './role.model';

export interface State extends EntityState<Role> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
