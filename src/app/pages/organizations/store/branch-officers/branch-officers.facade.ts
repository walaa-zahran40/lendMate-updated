import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './branch-officers.actions';
import * as Selectors from './branch-officers.selectors';
import { Observable } from 'rxjs';
import { BranchOfficer } from './branch-officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class BranchOfficersFacade {
  items$: Observable<BranchOfficer[]> = this.store.select(
    Selectors.selectBranchOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectBranchOfficersTotal
  );
  history$: Observable<BranchOfficer[]> = this.store.select(
    Selectors.selectBranchOfficersHistory
  );
  current$: Observable<BranchOfficer | undefined> = this.store.select(
    Selectors.selectCurrentBranchOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectBranchOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectBranchOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadBranchOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadBranchOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadBranchOfficer({ id }));
  }
  create(data: Partial<BranchOfficer>) {
    this.store.dispatch(Actions.createBranchOfficer({ data }));
  }
  update(id: any, data: Partial<BranchOfficer>) {
    this.store.dispatch(Actions.updateBranchOfficer({ id, data }));
  }
  /** NEW: dispatch the by-branchId loader */
  loadBranchOfficersByBranchId(branchId?: number) {
    if (branchId == null || isNaN(branchId)) {
      console.error(
        '❌ Facade.loadBranchOfficersByBranchId called with invalid id:',
        branchId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadBranchOfficersByBranchId({ branchId })
    );
  }

  /** UPDATED: now expects both id & parent branchId */
  delete(id: number, branchId: number) {
    this.store.dispatch(Actions.deleteBranchOfficer({ id, branchId }));
  }
  loadByBranchId(branchId: number) {
    this.store.dispatch(
      Actions.loadBranchOfficersByBranchId({ branchId })
    );
  }
}
