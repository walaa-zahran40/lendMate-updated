import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-statuses.actions';
import * as Selectors from './client-statuses.selectors';
import { Observable } from 'rxjs';
import { ClientStatus } from './client-status.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientStatusesFacade {
  items$: Observable<ClientStatus[]> = this.store.select(
    Selectors.selectClientStatuses
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientStatusesTotal
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
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientStatuses());
  }
  //History management
  history$ = this.store.select(Selectors.selectClientStatusHistory);

  readonly clientStatusHistory$ = this.store.select(
    Selectors.selectClientStatusHistory
  );
  readonly clientStatusHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadClientStatusHistory());
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
