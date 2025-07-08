import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateDetail } from './client-leasing-mandate.model';

export interface State extends EntityState<MandateDetail> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateDetail> =
  createEntityAdapter<MandateDetail>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
