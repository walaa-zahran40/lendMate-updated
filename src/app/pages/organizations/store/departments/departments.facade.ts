import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './departments.actions';
import * as Selectors from './departments.selectors';
import { Observable } from 'rxjs';
import { Department } from './department.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class DepartmentsFacade {
  items$: Observable<Department[]> = this.store.select(
    Selectors.selectDepartments
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectDepartmentsTotal
  );
  history$: Observable<Department[]> = this.store.select(
    Selectors.selectDepartmentsHistory
  );
  current$: Observable<Department | undefined> = this.store.select(
    Selectors.selectCurrentDepartment
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectDepartmentsLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectDepartmentsError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadDepartments());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadDepartmentsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadDepartment({ id }));
  }
  create(data: Partial<Department>) {
    this.store.dispatch(Actions.createDepartment({ data }));
  }
  update(id: any, data: Partial<Department>) {
    this.store.dispatch(Actions.updateDepartment({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteDepartment({ id }));
  }
}
