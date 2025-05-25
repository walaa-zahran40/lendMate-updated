import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Mandate } from './leasing-mandate.model';

export interface State extends EntityState<Mandate> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Mandate> = createEntityAdapter<Mandate>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
