import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';
import * as Selectors from './client-cr-authority-office.selectors';
import * as Actions from './client-cr-authority-office.actions';

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficesFacade {
  items$: Observable<ClientCRAuthorityOffice[]> = this.store.select(
    Selectors.selectClientCRAuthorityOffices
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientCRAuthorityOfficesTotal
  );
  history$: Observable<ClientCRAuthorityOffice[]> = this.store.select(
    Selectors.selectClientCRAuthorityOfficesHistory
  );
  current$: Observable<ClientCRAuthorityOffice | undefined> = this.store.select(
    Selectors.selectCurrentClientCRAuthorityOffice
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientCRAuthorityOfficesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientCRAuthorityOfficesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientCRAuthorityOffices());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientCRAuthorityOfficesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientCRAuthorityOffice({ id }));
  }
  create(data: Partial<ClientCRAuthorityOffice>) {
    this.store.dispatch(Actions.createClientCRAuthorityOffice({ data }));
  }
  update(id: any, data: Partial<ClientCRAuthorityOffice>) {
    this.store.dispatch(Actions.updateClientCRAuthorityOffice({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientCRAuthorityOfficesByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientCRAuthorityOfficesByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientCRAuthorityOfficesByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientCRAuthorityOffice({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientCRAuthorityOfficesByClientId({ clientId }));
  }
}
