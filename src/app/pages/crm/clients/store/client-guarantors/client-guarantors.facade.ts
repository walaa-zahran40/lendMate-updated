import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ClientGuarantor } from './client-guarantor.model';
import * as Selectors from './client-guarantors.selectors';
import * as Actions from './client-guarantors.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientGuarantorsFacade {
  items$: Observable<ClientGuarantor[]> = this.store.select(
    Selectors.selectClientGuarantors
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectClientGuarantorsTotal
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientGuarantorsLoading
  );
  current$: Observable<ClientGuarantor | undefined> = this.store.select(
    Selectors.selectCurrentClientGuarantor
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectClientGuarantorsError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientGuarantors());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadClientGuarantorsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientGuarantor({ id }));
  }
  create(data: Partial<ClientGuarantor>) {
    this.store.dispatch(Actions.createClientGuarantor({ data }));
  }
  update(id: any, data: Partial<ClientGuarantor>) {
    this.store.dispatch(Actions.updateClientGuarantor({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadClientGuarantorsByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadClientGuarantorsByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadClientGuarantorsByClientId({ clientId }));
  } /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientGuarantor({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientGuarantorsByClientId({ clientId }));
  }
}
