import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './department-managers.actions';
import * as Selectors from './department-managers.selectors';
import { Observable } from 'rxjs';
import { DepartmentManager } from './department-manager.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class DepartmentManagersFacade {
  items$: Observable<DepartmentManager[]> = this.store.select(
    Selectors.selectDepartmentManagers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectDepartmentManagersTotal
  );
  history$: Observable<DepartmentManager[]> = this.store.select(
    Selectors.selectDepartmentManagersHistory
  );
  current$: Observable<DepartmentManager | undefined> = this.store.select(
    Selectors.selectCurrentDepartmentManager
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectDepartmentManagersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectDepartmentManagersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadDepartmentManagers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadDepartmentManagersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadDepartmentManager({ id }));
  }
  create(data: Partial<DepartmentManager>) {
    this.store.dispatch(Actions.createDepartmentManager({ data }));
  }
  update(id: any, data: Partial<DepartmentManager>) {
    this.store.dispatch(Actions.updateDepartmentManager({ id, data }));
  }
  /** NEW: dispatch the by-departmentId loader */
  loadDepartmentManagersByDepartmentId(departmentId?: number) {
    if (departmentId == null || isNaN(departmentId)) {
      console.error(
        '❌ Facade.loadDepartmentManagersByDepartmentId called with invalid id:',
        departmentId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadDepartmentManagersByDepartmentId({ departmentId })
    );
  }

  /** UPDATED: now expects both id & parent departmentId */
  delete(id: number, departmentId: number) {
    this.store.dispatch(Actions.deleteDepartmentManager({ id, departmentId }));
  }
  loadByDepartmentId(departmentId: number) {
    this.store.dispatch(
      Actions.loadDepartmentManagersByDepartmentId({ departmentId })
    );
  }
}
