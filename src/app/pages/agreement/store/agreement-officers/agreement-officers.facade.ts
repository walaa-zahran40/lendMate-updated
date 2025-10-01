import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './agreement-officers.actions';
import * as Selectors from './agreement-officers.selectors';
import { Observable } from 'rxjs';
import { AgreementOfficer } from './agreement-officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AgreementOfficersFacade {
  items$: Observable<AgreementOfficer[]> = this.store.select(
    Selectors.selectAgreementOfficers
  );

  total$: Observable<number> = this.store.select(
    Selectors.selectAgreementOfficersTotal
  );
  history$: Observable<AgreementOfficer[]> = this.store.select(
    Selectors.selectAgreementOfficersHistory
  );
  current$: Observable<AgreementOfficer | undefined> = this.store.select(
    Selectors.selectCurrentAgreementOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAgreementOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAgreementOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAgreementOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAgreementOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAgreementOfficer({ id }));
  }
  create(data: Partial<AgreementOfficer>) {
    this.store.dispatch(Actions.createAgreementOfficer({ data }));
  }
  update(id: any, data: Partial<AgreementOfficer>) {
    this.store.dispatch(Actions.updateAgreementOfficer({ id, data }));
  }
  loadByAgreementId(id: number) {
    this.store.dispatch(
      Actions.loadAgreementOfficersByAgreementId({ agreementId: id })
    );
  }

  /** NEW: dispatch the by-clientId loader */
  loadAgreementOfficersByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadAgreementOfficersByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadAgreementOfficersByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteAgreementOfficer({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadAgreementOfficersByClientId({ clientId }));
  }
}
