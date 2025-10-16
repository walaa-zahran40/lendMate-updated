import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientTMLOfficer } from './client-tml-officer.model';
import * as Selectors from './client-tml-officers.selectors';
import * as Actions from './client-tml-officers.actions';

@Injectable({ providedIn: 'root' })
export class ClientTMLOfficersFacade {
  items$: Observable<ClientTMLOfficer[]> = this.store.select(
    Selectors.selectClientTMLOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientTMLOfficersTotal
  );
  history$: Observable<ClientTMLOfficer[]> = this.store.select(
    Selectors.selectClientTMLOfficersHistory
  );
  current$: Observable<ClientTMLOfficer | undefined> = this.store.select(
    Selectors.selectCurrentClientTMLOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientTMLOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientTMLOfficersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientTMLOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientTMLOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientTMLOfficer({ id }));
  }
  create(data: Partial<ClientTMLOfficer>) {
    this.store.dispatch(Actions.createClientTMLOfficer({ data }));
  }
  update(id: any, data: Partial<ClientTMLOfficer>) {
    this.store.dispatch(Actions.updateClientTMLOfficer({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientTMLOfficersByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientTMLOfficersByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientTMLOfficersByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientTMLOfficer({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientTMLOfficersByClientId({ clientId }));
  }
}
