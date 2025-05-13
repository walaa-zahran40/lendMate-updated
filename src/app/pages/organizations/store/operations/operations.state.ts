import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Operation } from './operation.model';

export interface State extends EntityState<Operation> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Operation> =
  createEntityAdapter<Operation>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
