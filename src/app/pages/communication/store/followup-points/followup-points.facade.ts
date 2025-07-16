import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './followup-points.actions';
import * as Selectors from './followup-points.selectors';
import { Observable } from 'rxjs';
import { FollowupPoint } from './followup-point.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class FollowupPointsFacade {
  items$: Observable<FollowupPoint[]> = this.store.select(
    Selectors.selectFollowupPoints
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectFollowupPointsTotal
  );
  history$: Observable<FollowupPoint[]> = this.store.select(
    Selectors.selectFollowupPointsHistory
  );
  current$: Observable<FollowupPoint | undefined> = this.store.select(
    Selectors.selectCurrentFollowupPoint
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectFollowupPointsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectFollowupPointsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadFollowupPoints());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadFollowupPointsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadFollowupPoint({ id }));
  }
  create(data: Partial<FollowupPoint>) {
    this.store.dispatch(Actions.createFollowupPoint({ data }));
  }
  update(id: any, data: Partial<FollowupPoint>) {
    this.store.dispatch(Actions.updateFollowupPoint({ id, data }));
  }
  /** NEW: dispatch the by-communicationId loader */
  loadFollowupPointsByClientId(communicationId?: number) {
    if (communicationId == null || isNaN(communicationId)) {
      return;
    }
    this.store.dispatch(
      Actions.loadFollowupPointsByCommunicationId({ communicationId })
    );
  }

  /** UPDATED: now expects both id & parent communicationId */
  delete(id: number, communicationId: number) {
    this.store.dispatch(Actions.deleteFollowupPoint({ id, communicationId }));
  }
  loadByCommunicationId(communicationId: number) {
    this.store.dispatch(
      Actions.loadFollowupPointsByCommunicationId({ communicationId })
    );
  }
}
