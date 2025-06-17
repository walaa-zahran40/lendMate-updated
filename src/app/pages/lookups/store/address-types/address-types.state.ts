import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AddressType } from './address-type.model';

export interface State extends EntityState<AddressType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: AddressType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<AddressType> =
  createEntityAdapter<AddressType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
