import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Team } from './team.model';

export interface State extends EntityState<Team> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
