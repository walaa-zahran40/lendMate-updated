import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MandateContactPersonsActions as A } from './mandate-contact-persons.actions';
import * as Sel from './mandate-contact-persons.selectors';
import {
  CreateMandateContactPersonDto,
  UpdateMandateContactPersonDto,
} from './mandate-contact-person.model';

@Injectable({ providedIn: 'root' })
export class MandateContactPersonsFacade {
  private store = inject(Store);

  // selectors
  all$ = this.store.select(Sel.selectAllContactPersons);
  listLoading$ = this.store.select(Sel.selectListLoading);
  listError$ = this.store.select(Sel.selectListError);
  listPageNumber$ = this.store.select(Sel.selectListPageNumber);
  listTotalCount$ = this.store.select(Sel.selectListTotalCount);

  byMandateLoading$ = this.store.select(Sel.selectByMandateLoading);
  byMandateError$ = this.store.select(Sel.selectByMandateError);

  selectContactPersonsByMandate(mandateId: number) {
    return this.store.select(Sel.selectContactPersonsByMandate(mandateId));
  }

  // commands
  loadAll(pageNumber?: number) {
    this.store.dispatch(A.loadAllRequested({ pageNumber }));
  }

  loadByMandate(mandateId: number) {
    this.store.dispatch(A.loadByMandateRequested({ mandateId }));
  }

  loadOne(mandateContactPersonId: number) {
    this.store.dispatch(A.loadOneRequested({ mandateContactPersonId }));
  }

  create(dto: CreateMandateContactPersonDto) {
    this.store.dispatch(A.createRequested({ dto }));
  }

  update(dto: UpdateMandateContactPersonDto) {
    this.store.dispatch(A.updateRequested({ dto }));
  }
  selectById(id: number) {
    return this.store.select(Sel.selectContactPersonById(id));
  }

  delete(id: number) {
    this.store.dispatch(A.deleteRequested({ id }));
  }

  clearErrors() {
    this.store.dispatch(A.clearErrors());
  }
}
