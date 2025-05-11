import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './branch-addresses.actions';
import * as Selectors from './branch-addresses.selectors';
import { Observable } from 'rxjs';
import { BranchAddress } from './branch-addresses.model';

@Injectable({ providedIn: 'root' })
export class BranchAddressesFacade {
  items$: Observable<BranchAddress[]> = this.store.select(
    Selectors.selectBranchAddresses
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectBranchAddressesTotal
  );
  history$: Observable<BranchAddress[]> = this.store.select(
    Selectors.selectBranchAddressesHistory
  );
  current$: Observable<BranchAddress | undefined> = this.store.select(
    Selectors.selectCurrentBranchAddress
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectBranchAddressesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectBranchAddressesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadBranchAddresses());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadBranchAddressesHistory());
  }
  loadAllByBranchId(branchId: number) {
    this.store.dispatch(Actions.loadBranchAddressesByBranchId({branchId}));
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadBranchAddress({ id }));
  }
  create(data: Partial<BranchAddress>) {
    this.store.dispatch(Actions.createBranchAddress({ data }));
  }
  update(id: any, data: Partial<BranchAddress>) {
    this.store.dispatch(Actions.updateBranchAddress({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteBranchAddress({ id }));
  }
}
