import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ClientsAddressesActions from './client-addresses.actions';
import * as fromClientsAddresses from './client-addresses.selectors';
import { ClientAddress } from './client-addresses.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientsAddressesFacade {
  items$: Observable<ClientAddress[]> = this.store.pipe(
    select(fromClientsAddresses.selectAllClientsAddresses)
  );
  totalCount$: Observable<number> = this.store.pipe(
    select(fromClientsAddresses.selectClientsAddressesTotalCount)
  );
  loading$: Observable<boolean> = this.store.pipe(
    select(fromClientsAddresses.selectClientsAddressesLoading)
  );
  error$: Observable<any> = this.store.pipe(
    select(fromClientsAddresses.selectClientsAddressesError)
  );

  constructor(private store: Store) {}

  loadAll(): void {
    this.store.dispatch(ClientsAddressesActions.loadClientsAddresses());
  }

  loadByClient(clientId: number): void {
    this.store.dispatch(
      ClientsAddressesActions.loadClientsAddressesByClient({ clientId })
    );
  }

  create(address: Partial<ClientAddress>): void {
    this.store.dispatch(
      ClientsAddressesActions.createClientAddress({ address })
    );
  }

  update(id: number, changes: Partial<ClientAddress>): void {
    this.store.dispatch(
      ClientsAddressesActions.updateClientAddress({ id, changes })
    );
  }

  delete(id: number): void {
    this.store.dispatch(ClientsAddressesActions.deleteClientAddress({ id }));
  }
}
