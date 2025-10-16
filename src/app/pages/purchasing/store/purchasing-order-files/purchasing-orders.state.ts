import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PurchaseOrderFile } from './purchasing-order-file.model';

export interface State extends EntityState<PurchaseOrderFile> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PurchaseOrderFile[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PurchaseOrderFile> =
  createEntityAdapter<PurchaseOrderFile>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
