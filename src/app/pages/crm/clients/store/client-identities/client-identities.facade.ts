import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-identities.actions';
import * as Selectors from './client-identities.selectors';
import { Observable } from 'rxjs';
import { ClientIdentity } from './client-identity.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientIdentitiesFacade {
  items$: Observable<ClientIdentity[]> = this.store.select(
    Selectors.selectClientIdentities
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientIdentitiesTotal
  );
  history$: Observable<ClientIdentity[]> = this.store.select(
    Selectors.selectClientIdentitiesHistory
  );
  current$: Observable<ClientIdentity | undefined> = this.store.select(
    Selectors.selectCurrentClientIdentity
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientIdentitiesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientIdentitiesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientIdentities());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientIdentitiesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientIdentity({ id }));
  }
  create(data: Partial<ClientIdentity>) {
    this.store.dispatch(Actions.createClientIdentity({ data }));
  }
  update(id: any, data: Partial<ClientIdentity>) {
    this.store.dispatch(Actions.updateClientIdentity({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientIdentitiesByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientIdentitiesByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientIdentitiesByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientIdentity({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientIdentitiesByClientId({ clientId }));
  }
}
