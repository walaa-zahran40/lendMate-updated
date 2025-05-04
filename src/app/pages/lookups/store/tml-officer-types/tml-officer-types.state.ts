import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TmlOfficerType } from './tml-officer-type.model';

export interface State extends EntityState<TmlOfficerType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<TmlOfficerType> =
  createEntityAdapter<TmlOfficerType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
