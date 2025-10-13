import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-phone-numbers.actions';
import * as Selectors from './client-phone-numbers.selectors';
import { Observable } from 'rxjs';
import { ClientPhoneNumber } from './client-phone-number.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientPhoneNumbersFacade {
  items$: Observable<ClientPhoneNumber[]> = this.store.select(
    Selectors.selectClientPhoneNumbers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientPhoneNumbersTotal
  );
  history$: Observable<ClientPhoneNumber[]> = this.store.select(
    Selectors.selectClientPhoneNumbersHistory
  );
  current$: Observable<ClientPhoneNumber | undefined> = this.store.select(
    Selectors.selectCurrentClientPhoneNumber
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientPhoneNumbersLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientPhoneNumbersError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientPhoneNumbers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientPhoneNumbersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientPhoneNumber({ id }));
  }
  create(data: Partial<ClientPhoneNumber>) {
    this.store.dispatch(Actions.createClientPhoneNumber({ data }));
  }
  update(id: any, data: Partial<ClientPhoneNumber>) {
    this.store.dispatch(Actions.updateClientPhoneNumber({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientPhoneNumbersByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientPhoneNumbersByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientPhoneNumbersByClientId({ clientId }));
  }
  delete(id: number, clientId: number) {
    console.log('[Facade] dispatch delete →', { id, clientId });
    this.store.dispatch(Actions.deleteClientPhoneNumber({ id, clientId }));
  }

  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientPhoneNumbersByClientId({ clientId }));
  }
}
