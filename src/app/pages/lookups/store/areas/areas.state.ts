import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Area } from './area.model';

export interface State extends EntityState<Area> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Area> = createEntityAdapter<Area>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
