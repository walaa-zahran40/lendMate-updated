import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './purchasing-orders.actions';
import * as Selectors from './purchasing-orders.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { PurchaseOrder } from './purchasing-order.model';

@Injectable({ providedIn: 'root' })
export class PurchasingOrdersFacade {
  all$ = this.store.select(Selectors.selectAllPurchasingOrders);
  loading$ = this.store.select(Selectors.selectPurchasingOrdersLoading);
  error$ = this.store.select(Selectors.selectPurchasingOrdersError);
  totalCount$ = this.store.select(Selectors.selectPurchasingOrdersTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  workFlowActionSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<PurchaseOrder, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PurchaseOrder>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly assetHistory$ = this.store.select(Selectors.selectHistory);
  readonly assetHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadPurchasingOrderHistory());
  }
}
