import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientStatusAction } from './client-statuses-action.model';

export interface State extends EntityState<ClientStatusAction> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<ClientStatusAction> = createEntityAdapter<ClientStatusAction>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
