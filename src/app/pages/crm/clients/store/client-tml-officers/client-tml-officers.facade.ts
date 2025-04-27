import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TMLActions from './client-tml-officers.actions';
import * as TMLSelectors from './client-tml-officers.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class anysFacade {
  items$: Observable<any[]> = this.store.select(TMLSelectors.selectTMLOfficers);
  history$: Observable<any[]> = this.store.select(
    TMLSelectors.selectTMLOfficersHistory
  );
  loading$: Observable<boolean> = this.store.select(
    TMLSelectors.selectTMLOfficersLoading
  );
  error$: Observable<any> = this.store.select(
    TMLSelectors.selectTMLOfficersError
  );

  constructor(private store: Store) {}

  loadTMLOfficers(clientId: number) {
    this.store.dispatch(TMLActions.loadTMLOfficers({ clientId }));
  }

  createTMLOfficer(officer: any) {
    this.store.dispatch(TMLActions.createTMLOfficer({ officer }));
  }

  updateTMLOfficer(id: number, officer: any) {
    this.store.dispatch(TMLActions.updateTMLOfficer({ id, officer }));
  }

  deleteTMLOfficer(id: number) {
    this.store.dispatch(TMLActions.deleteTMLOfficer({ id }));
  }

  loadHistory() {
    this.store.dispatch(TMLActions.loadTMLOfficersHistory());
  }
}
