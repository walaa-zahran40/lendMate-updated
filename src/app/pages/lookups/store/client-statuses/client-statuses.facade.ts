import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-statuses.actions';
import * as Selectors from './client-statuses.selectors';
import { Observable } from 'rxjs';
import { ClientStatus } from './client-status.model';

@Injectable({ providedIn: 'root' })
export class ClientStatusesFacade {
  items$: Observable<ClientStatus[]> = this.store.select(
    Selectors.selectClientStatuses
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientStatusesTotal
  );
  history$: Observable<ClientStatus[]> = this.store.select(
    Selectors.selectClientStatusesHistory
  );
  current$: Observable<ClientStatus | undefined> = this.store.select(
    Selectors.selectCurrentClientStatus
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientStatusesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientStatusesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientStatuses());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientStatusesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientStatus({ id }));
  }
  create(data: Partial<ClientStatus>) {
    this.store.dispatch(Actions.createClientStatus({ data }));
  }
  update(id: any, data: Partial<ClientStatus>) {
    this.store.dispatch(Actions.updateClientStatus({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteClientStatus({ id }));
  }
}
