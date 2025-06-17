import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './notification-group-officers.actions';
import * as Selectors from './notification-group-officers.selectors';
import { NotificationGroupOfficer } from './notification-group-officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class NotificationGroupOfficersFacade {
  all$ = this.store.select(Selectors.selectAllNotificationGroupOfficers);
  loading$ = this.store.select(
    Selectors.selectNotificationGroupOfficersLoading
  );
  error$ = this.store.select(Selectors.selectNotificationGroupOfficersError);
  totalCount$ = this.store.select(
    Selectors.selectNotificationGroupOfficersTotalCount
  );
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<NotificationGroupOfficer, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<NotificationGroupOfficer>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectNotificationGroupOfficerHistory);

  readonly notificationGroupOfficerHistory$ = this.store.select(
    Selectors.selectNotificationGroupOfficerHistory
  );
  readonly notificationGroupOfficerHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadNotificationGroupOfficerHistory());
  }
}
