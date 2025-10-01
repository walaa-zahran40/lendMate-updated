import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './agreement-registrations.actions';
import * as Selectors from './agreement-registrations.selectors';
import { Observable } from 'rxjs';
import { AgreementRegistration } from './agreement-registration.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AgreementRegistrationsFacade {
  items$: Observable<AgreementRegistration[]> = this.store.select(
    Selectors.selectAgreementRegistrations
  );

  total$: Observable<number> = this.store.select(
    Selectors.selectAgreementRegistrationsTotal
  );
  history$: Observable<AgreementRegistration[]> = this.store.select(
    Selectors.selectAgreementRegistrationsHistory
  );
  current$: Observable<AgreementRegistration | undefined> = this.store.select(
    Selectors.selectCurrentAgreementRegistration
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAgreementRegistrationsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAgreementRegistrationsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAgreementRegistrations());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAgreementRegistrationsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAgreementRegistration({ id }));
  }
  create(data: Partial<AgreementRegistration>) {
    this.store.dispatch(Actions.createAgreementRegistration({ data }));
  }
  update(id: any, data: Partial<AgreementRegistration>) {
    this.store.dispatch(Actions.updateAgreementRegistration({ id, data }));
  }
  loadByAgreementId(id: number) {
    this.store.dispatch(
      Actions.loadAgreementRegistrationsByAgreementId({ agreementId: id })
    );
  }

  /** NEW: dispatch the by-clientId loader */
  loadAgreementRegistrationsByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadAgreementRegistrationsByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadAgreementRegistrationsByClientId({ clientId })
    );
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteAgreementRegistration({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(
      Actions.loadAgreementRegistrationsByClientId({ clientId })
    );
  }
}
