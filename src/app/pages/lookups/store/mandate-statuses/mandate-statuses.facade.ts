import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './mandate-statuses.actions';
import * as Selectors from './mandate-statuses.selectors';
import { Observable } from 'rxjs';
import { MandateStatus } from './mandate-status.model';

@Injectable({ providedIn: 'root' })
export class MandateStatusesFacade {
  items$: Observable<MandateStatus[]> = this.store.select(
    Selectors.selectMandateStatuses
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectMandateStatusesTotal
  );
  history$: Observable<MandateStatus[]> = this.store.select(
    Selectors.selectMandateStatusesHistory
  );
  current$: Observable<MandateStatus | undefined> = this.store.select(
    Selectors.selectCurrentMandateStatus
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectMandateStatusesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectMandateStatusesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadMandateStatuses());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadMandateStatusesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadMandateStatus({ id }));
  }
  create(data: Partial<MandateStatus>) {
    this.store.dispatch(Actions.createMandateStatus({ data }));
  }
  update(id: any, data: Partial<MandateStatus>) {
    this.store.dispatch(Actions.updateMandateStatus({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteMandateStatus({ id }));
  }
}