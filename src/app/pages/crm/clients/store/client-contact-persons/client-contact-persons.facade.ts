import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-contact-persons.actions';
import * as Selectors from './client-contact-persons.selectors';
import { Observable } from 'rxjs';
import { ClientContactPerson } from './client-contact-person.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientContactPersonsFacade {
  items$: Observable<ClientContactPerson[]> = this.store.select(
    Selectors.selectClientContactPersons
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientContactPersonsTotal
  );
  history$: Observable<ClientContactPerson[]> = this.store.select(
    Selectors.selectClientContactPersonsHistory
  );
  current$: Observable<ClientContactPerson | undefined> = this.store.select(
    Selectors.selectCurrentClientContactPerson
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientContactPersonsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientContactPersonsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientContactPersons());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientContactPersonsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientContactPerson({ id }));
  }
  create(data: Partial<ClientContactPerson>) {
    this.store.dispatch(Actions.createClientContactPerson({ data }));
  }
  update(id: any, data: Partial<ClientContactPerson>) {
    this.store.dispatch(Actions.updateClientContactPerson({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientContactPersonsByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientContactPersonsByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadClientContactPersonsByClientId({ clientId })
    );
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientContactPerson({ id, clientId }));
  }
  loadByClientId(clientId: any) {
    this.store.dispatch(
      Actions.loadClientContactPersonsByClientId({ clientId })
    );
  }
}
