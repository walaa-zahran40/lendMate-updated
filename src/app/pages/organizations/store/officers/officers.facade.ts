import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './officers.actions';
import * as Selectors from './officers.selectors';
import { Observable } from 'rxjs';
import { Officer } from './officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class OfficersFacade {
  items$: Observable<Officer[]> = this.store.select(
    Selectors.selectOfficers
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectOfficersTotal
  );
  history$: Observable<Officer[]> = this.store.select(
    Selectors.selectOfficersHistory
  );
  current$: Observable<Officer | undefined> = this.store.select(
    Selectors.selectCurrentOfficer
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectOfficersLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectOfficersError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadOfficers());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadOfficersHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadOfficer({ id }));
  }
  create(data: Partial<Officer>) {
    this.store.dispatch(Actions.createOfficer({ data }));
  }
  update(id: any, data: Partial<Officer>) {
    this.store.dispatch(Actions.updateOfficer({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteOfficer({ id }));
  }
}
