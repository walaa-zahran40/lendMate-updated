import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './notification-groups.actions';
import * as Selectors from './notification-groups.selectors';
import { NotificationGroup } from './notification-group.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class NotificationGroupsFacade {
  all$ = this.store.select(Selectors.selectAllNotificationGroups);
  loading$ = this.store.select(Selectors.selectNotificationGroupsLoading);
  error$ = this.store.select(Selectors.selectNotificationGroupsError);
  totalCount$ = this.store.select(Selectors.selectNotificationGroupsTotalCount);
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

  create(payload: Partial<Omit<NotificationGroup, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<NotificationGroup>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectNotificationGroupHistory);

  readonly notificationGroupHistory$ = this.store.select(
    Selectors.selectNotificationGroupHistory
  );
  readonly notificationGroupHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadNotificationGroupHistory());
  }
}
