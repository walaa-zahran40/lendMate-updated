import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MandateOfficersActions as A } from './mandate-officers.actions';
import * as Sel from './mandate-officers.selectors';
import {
  CreateMandateOfficerDto,
  UpdateMandateOfficerDto,
} from './mandate-officer.model';

@Injectable({ providedIn: 'root' })
export class MandateOfficersFacade {
  private store = inject(Store);

  // selectors
  all$ = this.store.select(Sel.selectAllOfficers);
  listLoading$ = this.store.select(Sel.selectListLoading);
  listError$ = this.store.select(Sel.selectListError);
  listPageNumber$ = this.store.select(Sel.selectListPageNumber);
  listTotalCount$ = this.store.select(Sel.selectListTotalCount);

  byMandateLoading$ = this.store.select(Sel.selectByMandateLoading);
  byMandateError$ = this.store.select(Sel.selectByMandateError);

  selectOfficersByMandate(mandateId: number) {
    return this.store.select(Sel.selectOfficersByMandate(mandateId));
  }

  // commands
  loadAll(pageNumber?: number) {
    this.store.dispatch(A.loadAllRequested({ pageNumber }));
  }

  loadByMandate(mandateId: number) {
    this.store.dispatch(A.loadByMandateRequested({ mandateId }));
  }

  loadOne(mandateOfficerId: number) {
    this.store.dispatch(A.loadOneRequested({ mandateOfficerId }));
  }

  create(dto: CreateMandateOfficerDto) {
    this.store.dispatch(A.createRequested({ dto }));
  }

  update(dto: UpdateMandateOfficerDto) {
    this.store.dispatch(A.updateRequested({ dto }));
  }

  delete(id: number) {
    this.store.dispatch(A.deleteRequested({ id }));
  }

  clearErrors() {
    this.store.dispatch(A.clearErrors());
  }
}
