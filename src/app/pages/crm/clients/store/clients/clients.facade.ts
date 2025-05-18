// clients.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClientsActions from './clients.actions';
import * as ClientsSelectors from './clients.selectors';
import { Client } from './client.model';
import { ClientsState } from './clients.state';

// Declare the shape of the feature slice
interface ClientsFeature {
  clients: ClientsState;
}

@Injectable({ providedIn: 'root' })
export class ClientsFacade {
  // streams driven by your selectors
  clients$ = this.store.select(ClientsSelectors.selectAllClients);
  loading$ = this.store.select(ClientsSelectors.selectClientsLoading);
  subSectorList$ = this.store.select(ClientsSelectors.selectSubSectorList);
  selectedClient$ = this.store.select(ClientsSelectors.selectSelectedClient);

  constructor(private store: Store<ClientsFeature>) {}

  // for listing
  loadClients() {
    this.store.dispatch(ClientsActions.loadClients());
  }

  // for edit/view
  loadClient(clientId: number) {
    this.store.dispatch(ClientsActions.loadClient({ clientId }));
  }

  // create flow
  createClient(payload: any) {
    this.store.dispatch(ClientsActions.createClient({ payload }));
  }

  // update flow
  updateClient(client: Client) {
    this.store.dispatch(ClientsActions.updateClient({ client }));
  }

  // support for sub-sector‐only updates if you need it
  updateSubSectorList(subSectorIds: number[]) {
    this.store.dispatch(ClientsActions.updateSubSectorList({ subSectorIds }));
  }

  // delete flow
  deleteClient(clientId: number) {
    this.store.dispatch(ClientsActions.deleteClient({ clientId }));
  }
}
