import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './vendor-addresses.actions';
import * as Selectors from './vendor-addresses.selectors';
import { VendorAddress } from './vendor-address.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class VendorAddressesFacade {
  all$ = this.store.select(Selectors.selectAllVendorAddresses);
  loading$ = this.store.select(Selectors.selectVendorAddressesLoading);
  error$ = this.store.select(Selectors.selectVendorAddressesError);
  totalCount$ = this.store.select(Selectors.selectVendorAddressesTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<VendorAddress, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<VendorAddress>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectVendorAddressHistory);

  readonly vendorAddressHistory$ = this.store.select(
    Selectors.selectVendorAddressHistory
  );
  readonly vendorAddressHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadVendorAddressHistory());
  }
}
