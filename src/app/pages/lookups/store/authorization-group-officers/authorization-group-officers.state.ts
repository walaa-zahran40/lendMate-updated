import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuthorizationGroupOfficer } from './authorization-group-officer.model';

export interface State extends EntityState<AuthorizationGroupOfficer> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AuthorizationGroupOfficer> = createEntityAdapter<AuthorizationGroupOfficer>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
