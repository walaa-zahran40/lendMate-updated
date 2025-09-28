import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgreementContactPersonsActions as A } from './agreement-contact-persons.actions';
import * as Sel from './agreement-contact-persons.selectors';
import {
  CreateAgreementContactPersonDto,
  UpdateAgreementContactPersonDto,
} from './agreement-contact-person.model';

@Injectable({ providedIn: 'root' })
export class AgreementContactPersonsFacade {
  private store = inject(Store);

  // selectors
  all$ = this.store.select(Sel.selectAllContactPersons);
  listLoading$ = this.store.select(Sel.selectListLoading);
  listError$ = this.store.select(Sel.selectListError);
  listPageNumber$ = this.store.select(Sel.selectListPageNumber);
  listTotalCount$ = this.store.select(Sel.selectListTotalCount);

  byAgreementLoading$ = this.store.select(Sel.selectByAgreementLoading);
  byAgreementError$ = this.store.select(Sel.selectByAgreementError);

  selectContactPersonsByAgreement(agreementId: number) {
    return this.store.select(Sel.selectContactPersonsByAgreement(agreementId));
  }

  // commands
  loadAll(pageNumber?: number) {
    this.store.dispatch(A.loadAllRequested({ pageNumber }));
  }

  loadByAgreement(agreementId: number) {
    this.store.dispatch(A.loadByAgreementRequested({ agreementId }));
  }

  loadOne(agreementContactPersonId: number) {
    this.store.dispatch(A.loadOneRequested({ agreementContactPersonId }));
  }

  create(dto: CreateAgreementContactPersonDto) {
    this.store.dispatch(A.createRequested({ dto }));
  }

  update(dto: UpdateAgreementContactPersonDto) {
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
