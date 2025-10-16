import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientTaxOffice } from './client-tax-office.model';
import * as Selectors from './client-tax-offices.selectors';
import * as Actions from './client-tax-offices.actions';

@Injectable({ providedIn: 'root' })
export class ClientTaxOfficesFacade {
  items$: Observable<ClientTaxOffice[]> = this.store.select(
    Selectors.selectClientTaxOffices
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientTaxOfficesTotal
  );
  history$: Observable<ClientTaxOffice[]> = this.store.select(
    Selectors.selectClientTaxOfficesHistory
  );
  current$: Observable<ClientTaxOffice | undefined> = this.store.select(
    Selectors.selectCurrentClientTaxOffice
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientTaxOfficesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientTaxOfficesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientTaxOffices());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientTaxOfficesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientTaxOffice({ id }));
  }
  create(data: Partial<ClientTaxOffice>) {
    this.store.dispatch(Actions.createClientTaxOffice({ data }));
  }
  update(id: any, data: Partial<ClientTaxOffice>) {
    this.store.dispatch(Actions.updateClientTaxOffice({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientTaxOfficesByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientTaxOfficesByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientTaxOfficesByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientTaxOffice({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientTaxOfficesByClientId({ clientId }));
  }
}
