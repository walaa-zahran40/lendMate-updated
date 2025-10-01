import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './agreement-contact-persons.actions';
import * as Selectors from './agreement-contact-persons.selectors';
import { Observable } from 'rxjs';
import { AgreementContactPerson } from './agreement-contact-person.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AgreementContactPersonsFacade {
  items$: Observable<AgreementContactPerson[]> = this.store.select(
    Selectors.selectAgreementContactPersons
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectAgreementContactPersonsTotal
  );
  history$: Observable<AgreementContactPerson[]> = this.store.select(
    Selectors.selectAgreementContactPersonsHistory
  );
  current$: Observable<AgreementContactPerson | undefined> = this.store.select(
    Selectors.selectCurrentAgreementContactPerson
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAgreementContactPersonsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAgreementContactPersonsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAgreementContactPersons());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAgreementContactPersonsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAgreementContactPerson({ id }));
  }
  create(data: Partial<AgreementContactPerson>) {
    this.store.dispatch(Actions.createAgreementContactPerson({ data }));
  }
  update(id: any, data: Partial<AgreementContactPerson>) {
    this.store.dispatch(Actions.updateAgreementContactPerson({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadAgreementContactPersonsByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadAgreementContactPersonsByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadAgreementContactPersonsByClientId({ clientId })
    );
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteAgreementContactPerson({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(
      Actions.loadAgreementContactPersonsByClientId({ clientId })
    );
  }
}
