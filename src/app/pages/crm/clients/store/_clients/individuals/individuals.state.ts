import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Individual } from './individual.model';

export interface State extends EntityState<Individual> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Individual> =
  createEntityAdapter<Individual>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
