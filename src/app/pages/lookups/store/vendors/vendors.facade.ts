import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './vendors.actions';
import * as Selectors from './vendors.selectors';
import { Vendor } from './vendor.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class VendorsFacade {
  all$ = this.store.select(Selectors.selectAllVendors);
  loading$ = this.store.select(Selectors.selectVendorsLoading);
  error$ = this.store.select(Selectors.selectVendorsError);
  totalCount$ = this.store.select(Selectors.selectVendorsTotalCount);

  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  vendorById$(id: number) {
    return this.store.select(Selectors.makeSelectVendorById(id));
  }

  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<Vendor, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Vendor>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  history$ = this.store.select(Selectors.selectVendorHistory);

  readonly vendorHistory$ = this.store.select(Selectors.selectVendorHistory);
  readonly vendorHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadVendorHistory());
  }
}
