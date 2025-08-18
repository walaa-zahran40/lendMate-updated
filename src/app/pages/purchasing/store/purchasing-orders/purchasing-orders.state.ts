import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PurchaseOrder } from './purchasing-order.model';

export interface State extends EntityState<PurchaseOrder> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PurchaseOrder[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PurchaseOrder> =
  createEntityAdapter<PurchaseOrder>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
