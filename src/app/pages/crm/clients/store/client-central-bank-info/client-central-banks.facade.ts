import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-central-banks.actions';
import * as Selectors from './client-central-banks.selectors';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientCentralBankInfo } from './client-central-bank.model';

@Injectable({ providedIn: 'root' })
export class ClientCentralBankInfoFacade {
  items$: Observable<ClientCentralBankInfo[]> = this.store.select(
    Selectors.selectClientCentralBankInfo
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientCentralBankInfoTotal
  );
  history$: Observable<ClientCentralBankInfo[]> = this.store.select(
    Selectors.selectClientCentralBankInfoHistory
  );
  current$: Observable<ClientCentralBankInfo | undefined> = this.store.select(
    Selectors.selectCurrentClientCentralBankInfo
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientCentralBankInfoLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientCentralBankInfoError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAllClientCentralBankInfo());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientCentralBankInfoHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientCentralBankInfo({ id }));
  }
  create(data: Partial<ClientCentralBankInfo>) {
    this.store.dispatch(Actions.createClientCentralBankInfo({ data }));
  }
  update(id: any, data: Partial<ClientCentralBankInfo>) {
    this.store.dispatch(Actions.updateClientCentralBankInfo({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientCentralBankInfoByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientCentralBankInfoByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadClientCentralBankInfoByClientId({ clientId })
    );
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientCentralBankInfo({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(
      Actions.loadClientCentralBankInfoByClientId({ clientId })
    );
  }
}
