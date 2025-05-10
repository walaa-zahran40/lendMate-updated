import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Country } from './country.model';

export interface State extends EntityState<Country> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
