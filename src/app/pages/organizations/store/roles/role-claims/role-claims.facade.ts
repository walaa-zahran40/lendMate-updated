import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './role-claims.actions';
import * as Selectors from './role-claims.selectors';
import { Observable } from 'rxjs';
import { BranchAddress } from './role-claim.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

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
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadBranchAddresses());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadBranchAddressesHistory());
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
  /** NEW: dispatch the by-branchId loader */
  loadBranchAddressesByBranchId(branchId?: number) {
    if (branchId == null || isNaN(branchId)) {
      console.error(
        '❌ Facade.loadBranchAddressesByBranchId called with invalid id:',
        branchId
      );
      return;
    }
    this.store.dispatch(Actions.loadBranchAddressesByBranchId({ branchId }));
  }

  /** UPDATED: now expects both id & parent branchId */
  delete(id: number, branchId: number) {
    this.store.dispatch(Actions.deleteBranchAddress({ id, branchId }));
  }
  loadByBranchId(branchId: number) {
    this.store.dispatch(Actions.loadBranchAddressesByBranchId({ branchId }));
  }
}
