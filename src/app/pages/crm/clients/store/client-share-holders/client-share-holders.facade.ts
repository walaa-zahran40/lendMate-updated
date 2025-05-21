import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientShareHolder } from './client-share-holders.model';
import * as Selectors from './client-share-holders.selectors';
import * as Actions from './client-share-holders.actions';

@Injectable({ providedIn: 'root' })
export class ClientShareHoldersFacade {
  items$: Observable<ClientShareHolder[]> = this.store.select(
    Selectors.selectClientShareHolders
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientShareHoldersTotal
  );
  history$: Observable<ClientShareHolder[]> = this.store.select(
    Selectors.selectClientShareHoldersHistory
  );
  current$: Observable<ClientShareHolder | undefined> = this.store.select(
    Selectors.selectCurrentClientShareHolder
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientShareHoldersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientShareHoldersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientShareHolders());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientShareHoldersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientShareHolder({ id }));
  }
  create(data: Partial<ClientShareHolder>) {
    this.store.dispatch(Actions.createClientShareHolder({ data }));
  }
  update(id: any, data: Partial<ClientShareHolder>) {
    this.store.dispatch(Actions.updateClientShareHolder({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientShareHoldersByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientShareHoldersByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientShareHoldersByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientShareHolder({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientShareHoldersByClientId({ clientId }));
  }
}
