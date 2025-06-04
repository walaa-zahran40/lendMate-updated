import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateStatusAction } from './mandate-status-action.model';

export interface State extends EntityState<MandateStatusAction> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateStatusAction> =
  createEntityAdapter<MandateStatusAction>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
