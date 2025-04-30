import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AddressType } from './address-types.model';

export interface State extends EntityState<AddressType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AddressType> =
  createEntityAdapter<AddressType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
