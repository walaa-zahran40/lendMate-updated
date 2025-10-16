import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './followups.actions';
import * as Selectors from './followups.selectors';
import { Observable } from 'rxjs';
import { Followup } from './followup.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class FollowupsFacade {
  items$: Observable<Followup[]> = this.store.select(Selectors.selectFollowups);
  total$: Observable<number> = this.store.select(
    Selectors.selectFollowupsTotal
  );
  history$: Observable<Followup[]> = this.store.select(
    Selectors.selectFollowupsHistory
  );
  current$: Observable<Followup | undefined> = this.store.select(
    Selectors.selectCurrentFollowup
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectFollowupsLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectFollowupsError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadFollowups());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadFollowupsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadFollowup({ id }));
  }
  create(data: Partial<Followup>) {
    this.store.dispatch(Actions.createFollowup({ data }));
  }
  update(id: any, data: Partial<Followup>) {
    this.store.dispatch(Actions.updateFollowup({ id, data }));
  }
  loadFollowupsByClientId(communicationId?: number) {
    if (communicationId == null || isNaN(communicationId)) {
      return;
    }
    this.store.dispatch(
      Actions.loadFollowupsByCommunicationId({ communicationId })
    );
  }

  delete(id: number, communicationId: number) {
    this.store.dispatch(Actions.deleteFollowup({ id, communicationId }));
  }
  loadByCommunicationId(communicationId: number) {
    this.store.dispatch(
      Actions.loadFollowupsByCommunicationId({ communicationId })
    );
  }
}
