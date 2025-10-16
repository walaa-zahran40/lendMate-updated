import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './branch-managers.actions';
import * as Selectors from './branch-managers.selectors';
import { Observable } from 'rxjs';
import { BranchManager } from './branch-manager.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class BranchManagersFacade {
  items$: Observable<BranchManager[]> = this.store.select(
    Selectors.selectBranchManagers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectBranchManagersTotal
  );
  history$: Observable<BranchManager[]> = this.store.select(
    Selectors.selectBranchManagersHistory
  );
  current$: Observable<BranchManager | undefined> = this.store.select(
    Selectors.selectCurrentBranchManager
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectBranchManagersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectBranchManagersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadBranchManagers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadBranchManagersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadBranchManager({ id }));
  }
  create(data: Partial<BranchManager>) {
    this.store.dispatch(Actions.createBranchManager({ data }));
  }
  update(id: any, data: Partial<BranchManager>) {
    this.store.dispatch(Actions.updateBranchManager({ id, data }));
  }
  /** NEW: dispatch the by-branchId loader */
  loadBranchManagersByBranchId(branchId?: number) {
    if (branchId == null || isNaN(branchId)) {
      console.error(
        '❌ Facade.loadBranchManagersByBranchId called with invalid id:',
        branchId
      );
      return;
    }
    this.store.dispatch(Actions.loadBranchManagersByBranchId({ branchId }));
  }

  /** UPDATED: now expects both id & parent branchId */
  delete(id: number, branchId: number) {
    this.store.dispatch(Actions.deleteBranchManager({ id, branchId }));
  }
  loadByBranchId(branchId: number) {
    this.store.dispatch(Actions.loadBranchManagersByBranchId({ branchId }));
  }
}
