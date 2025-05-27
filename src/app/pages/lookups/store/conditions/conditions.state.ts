import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Condition } from './condition.model';

export interface State extends EntityState<Condition> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Condition> =
  createEntityAdapter<Condition>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
