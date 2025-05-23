import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientOfficer } from './client-officer.model';
import * as Selectors from './client-officers.selectors';
import * as Actions from './client-officers.actions';

@Injectable({ providedIn: 'root' })
export class ClientOfficersFacade {
  items$: Observable<ClientOfficer[]> = this.store.select(
    Selectors.selectClientOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientOfficersTotal
  );
  history$: Observable<ClientOfficer[]> = this.store.select(
    Selectors.selectClientOfficersHistory
  );
  current$: Observable<ClientOfficer | undefined> = this.store.select(
    Selectors.selectCurrentClientOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientOfficer({ id }));
  }
  create(data: Partial<ClientOfficer>) {
    this.store.dispatch(Actions.createClientOfficer({ data }));
  }
  update(id: any, data: Partial<ClientOfficer>) {
    this.store.dispatch(Actions.updateClientOfficer({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientOfficersByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientOfficersByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientOfficersByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientOfficer({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientOfficersByClientId({ clientId }));
  }
}
