import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CreateLeasingAgreementRequest,
  WorkflowActionRequest,
} from './agreement.model';
import { LeasingAgreementsActions } from './agreements.actions';
import {
  selectAgreementsLoading,
  selectAgreementsError,
  selectAllAgreements,
  selectAgreementsTotal,
  selectSelectedAgreementId,
  selectSelectedAgreement,
  selectHistory,
} from './agreements.selectors';

@Injectable({ providedIn: 'root' })
export class LeasingAgreementsFacade {
  private store = inject(Store);

  // selectors
  loading$ = this.store.select(selectAgreementsLoading);
  error$ = this.store.select(selectAgreementsError);
  all$ = this.store.select(selectAllAgreements);
  total$ = this.store.select(selectAgreementsTotal);
  selectedId$ = this.store.select(selectSelectedAgreementId);
  selected$ = this.store.select(selectSelectedAgreement);
  history$ = this.store.select(selectHistory);

  // dispatchers
  loadAll() {
    this.store.dispatch(LeasingAgreementsActions.loadAll());
  }
  loadById(id: number) {
    this.store.dispatch(LeasingAgreementsActions.loadById({ id }));
  }
  loadByClient(clientId: number) {
    this.store.dispatch(LeasingAgreementsActions.loadByClient({ clientId }));
  }
  loadHistory(pageNumber: number) {
    this.store.dispatch(LeasingAgreementsActions.loadHistory({ pageNumber }));
  }
  select(id: number | null) {
    this.store.dispatch(LeasingAgreementsActions.select({ id }));
  }

  create(payload: CreateLeasingAgreementRequest) {
    this.store.dispatch(LeasingAgreementsActions.create({ payload }));
  }
  update(id: number, changes: Partial<CreateLeasingAgreementRequest>) {
    this.store.dispatch(LeasingAgreementsActions.update({ id, changes }));
  }
  delete(id: number) {
    this.store.dispatch(LeasingAgreementsActions.delete({ id }));
  }
  workflowAction(request: WorkflowActionRequest) {
    this.store.dispatch(LeasingAgreementsActions.workflowAction({ request }));
  }
}
