import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VendorAddress } from './vendor-address.model';

export interface State extends EntityState<VendorAddress> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: VendorAddress[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<VendorAddress> =
  createEntityAdapter<VendorAddress>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
