import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClientsActions from './clients.actions';
import * as ClientsSelectors from './clients.selectors';

@Injectable({ providedIn: 'root' })
export class ClientsFacade {
  clients$;
  loading$;

  constructor(private store: Store) {
    this.clients$ = this.store.select(ClientsSelectors.selectAllClients);
    this.loading$ = this.store.select(ClientsSelectors.selectClientsLoading);
  }

  loadClients() {
    this.store.dispatch(ClientsActions.loadClients());
  }
}
