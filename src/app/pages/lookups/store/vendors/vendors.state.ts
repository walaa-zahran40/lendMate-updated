import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vendor } from './vendor.model';

export interface State extends EntityState<Vendor> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Vendor[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Vendor> = createEntityAdapter<Vendor>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
