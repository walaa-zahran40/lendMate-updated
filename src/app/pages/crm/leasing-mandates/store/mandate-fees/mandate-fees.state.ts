import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateFee } from './mandate-fee.model';

export interface State extends EntityState<MandateFee> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateFee> =
  createEntityAdapter<MandateFee>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
