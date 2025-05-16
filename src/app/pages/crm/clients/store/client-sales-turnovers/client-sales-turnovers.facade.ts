import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-sales-turnovers.actions';
import * as Selectors from './client-sales-turnovers.selectors';
import { Observable } from 'rxjs';
import { ClientSalesTurnover } from './client-sales-turnovers.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientSalesTurnoversFacade {
  items$: Observable<ClientSalesTurnover[]> = this.store.select(
    Selectors.selectClientSalesTurnovers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientSalesTurnoversTotal
  );
  history$: Observable<ClientSalesTurnover[]> = this.store.select(
    Selectors.selectClientSalesTurnoversHistory
  );
  current$: Observable<ClientSalesTurnover | undefined> = this.store.select(
    Selectors.selectCurrentClientSalesTurnover
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientSalesTurnoversLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientSalesTurnoversError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientSalesTurnovers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientSalesTurnoversHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientSalesTurnover({ id }));
  }
  create(data: Partial<ClientSalesTurnover>) {
    this.store.dispatch(Actions.createClientSalesTurnover({ data }));
  }
  update(id: any, data: Partial<ClientSalesTurnover>) {
    this.store.dispatch(Actions.updateClientSalesTurnover({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientSalesTurnoversByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientSalesTurnoversByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientSalesTurnoversByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientSalesTurnover({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientSalesTurnoversByClientId({ clientId }));
  }
}
