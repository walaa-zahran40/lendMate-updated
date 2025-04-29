import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-identities.actions';
import * as Selectors from './client-identities.selectors';
import { Observable } from 'rxjs';
import { ClientIdentity, PagedResult } from './client-identities.service';

@Injectable({ providedIn: 'root' })
export class ClientIdentitiesFacade {
  all$ = this.store.select(Selectors.selectAllClientIdentities);
  loading$ = this.store.select(Selectors.selectClientIdentitiesLoading);
  error$ = this.store.select(Selectors.selectClientIdentitiesError);
  totalCount$ = this.store.select(Selectors.selectClientIdentitiesTotalCount);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAllClientIdentities({ pageNumber }));
  }

  loadByClient(clientId: number) {
    this.store.dispatch(Actions.loadClientIdentitiesByClient({ clientId }));
  }

  create(payload: Omit<ClientIdentity, 'id'>) {
    this.store.dispatch(Actions.createClientIdentity({ payload }));
  }

  update(id: number, changes: Partial<ClientIdentity>) {
    this.store.dispatch(Actions.updateClientIdentity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteClientIdentity({ id }));
  }
}
