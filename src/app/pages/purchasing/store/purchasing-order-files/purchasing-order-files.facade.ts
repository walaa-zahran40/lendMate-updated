import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './purchasing-order-files.actions';
import * as Selectors from './purchasing-order-files.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { PurchaseOrderFile } from './purchasing-order-file.model';

@Injectable({ providedIn: 'root' })
export class PurchasingOrderFilesFacade {
  all$ = this.store.select(Selectors.selectAllPurchasingOrderFiles);
  loading$ = this.store.select(Selectors.selectPurchasingOrderFilesLoading);
  error$ = this.store.select(Selectors.selectPurchasingOrderFilesError);
  totalCount$ = this.store.select(
    Selectors.selectPurchasingOrderFilesTotalCount
  );
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

  create(payload: Partial<Omit<PurchaseOrderFile, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PurchaseOrderFile>) {
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
    this.store.dispatch(Actions.loadPurchasingOrderFileHistory());
  }
}
