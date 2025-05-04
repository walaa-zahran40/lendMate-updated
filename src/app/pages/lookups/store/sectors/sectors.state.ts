import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Sector } from './sector.model';

export interface State extends EntityState<Sector> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Sector> = createEntityAdapter<Sector>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
