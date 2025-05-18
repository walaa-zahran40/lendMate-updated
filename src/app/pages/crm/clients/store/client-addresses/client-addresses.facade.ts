import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-addresses.actions';
import * as Selectors from './client-addresses.selectors';
import { Observable } from 'rxjs';
import { ClientAddress } from './client-address.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientAddressesFacade {
  items$: Observable<ClientAddress[]> = this.store.select(
    Selectors.selectClientAddresses
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientAddressesTotal
  );
  history$: Observable<ClientAddress[]> = this.store.select(
    Selectors.selectClientAddressesHistory
  );
  current$: Observable<ClientAddress | undefined> = this.store.select(
    Selectors.selectCurrentClientAddress
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientAddressesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientAddressesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientAddresses());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientAddressesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientAddress({ id }));
  }
  create(data: Partial<ClientAddress>) {
    this.store.dispatch(Actions.createClientAddress({ data }));
  }
  update(id: any, data: Partial<ClientAddress>) {
    this.store.dispatch(Actions.updateClientAddress({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientAddressesByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientAddressesByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientAddressesByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientAddress({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientAddressesByClientId({ clientId }));
  }
}
