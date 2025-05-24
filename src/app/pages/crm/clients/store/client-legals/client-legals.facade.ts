import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientLegal } from './client-legal.model';
import * as Selectors from './client-legals.selectors';
import * as Actions from './client-legals.actions';

@Injectable({ providedIn: 'root' })
export class ClientLegalsFacade {
  items$: Observable<ClientLegal[]> = this.store.select(
    Selectors.selectClientLegals
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientLegalsTotal
  );
  history$: Observable<ClientLegal[]> = this.store.select(
    Selectors.selectClientLegalsHistory
  );
  current$: Observable<ClientLegal | undefined> = this.store.select(
    Selectors.selectCurrentClientLegal
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientLegalsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientLegalsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientLegals());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientLegalsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientLegal({ id }));
  }
  create(data: Partial<ClientLegal>) {
    this.store.dispatch(Actions.createClientLegal({ data }));
  }
  update(id: any, data: Partial<ClientLegal>) {
    this.store.dispatch(Actions.updateClientLegal({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientLegalsByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientLegalsByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientLegalsByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientLegal({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientLegalsByClientId({ clientId }));
  }
}
