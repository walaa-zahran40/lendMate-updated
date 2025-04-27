import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromFeature from './client-cr-authority-office.reducer';
import * as Selectors from './client-cr-authority-office.selectors';
import * as Actions from './client-cr-authority-office.actions';
import { Observable } from 'rxjs';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficeFacade {
  all$: Observable<ClientCRAuthorityOffice[]> = this.store.select(
    Selectors.selectAllOffices
  );
  loading$: Observable<boolean> = this.store.select(Selectors.selectLoading);
  total$: Observable<number> = this.store.select(Selectors.selectTotalCount);
  error$: Observable<any> = this.store.select(Selectors.selectError);

  constructor(private store: Store<fromFeature.State>) {}

  loadAll(page: number = 1) {
    this.store.dispatch(Actions.loadClientCRAuthorityOffices({ page }));
  }

  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientCRAuthorityOffice({ id }));
  }

  create(data: Partial<ClientCRAuthorityOffice>) {
    this.store.dispatch(
      Actions.createClientCRAuthorityOffice({ office: data })
    );
  }

  update(id: number, changes: Partial<ClientCRAuthorityOffice>) {
    this.store.dispatch(Actions.updateClientCRAuthorityOffice({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteClientCRAuthorityOffice({ id }));
  }
}
