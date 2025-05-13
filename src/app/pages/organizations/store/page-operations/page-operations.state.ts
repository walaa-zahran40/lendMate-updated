import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PageOperation } from './page-operation.model';

export interface State extends EntityState<PageOperation> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<PageOperation> =
  createEntityAdapter<PageOperation>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
