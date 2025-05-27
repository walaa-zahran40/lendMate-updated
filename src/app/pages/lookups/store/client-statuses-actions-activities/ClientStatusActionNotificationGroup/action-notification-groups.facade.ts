import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ActionNotificationGroup } from './action-notification-group.model';
import * as Selectors from './action-notification-groups.selectors';
import * as Actions from './action-notification-groups.actions';

@Injectable({ providedIn: 'root' })
export class ActionNotificationGroupsFacade {
  items$: Observable<ActionNotificationGroup[]> = this.store.select(
    Selectors.selectActionNotificationGroups
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectActionNotificationGroupsTotal
  );
  history$: Observable<ActionNotificationGroup[]> = this.store.select(
    Selectors.selectActionNotificationGroupsHistory
  );
  current$: Observable<ActionNotificationGroup | undefined> = this.store.select(
    Selectors.selectCurrentActionNotificationGroup
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectActionNotificationGroupsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectActionNotificationGroupsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadActionNotificationGroups());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadActionNotificationGroupsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadActionNotificationGroup({ id }));
  }
  create(data: Partial<ActionNotificationGroup>) {
    this.store.dispatch(Actions.createActionNotificationGroup({ data }));
  }
  update(id: any, data: Partial<ActionNotificationGroup>) {
    this.store.dispatch(Actions.updateActionNotificationGroup({ id, data }));
  }
  /** NEW: dispatch the by-clientStatusActionId loader */
  loadActionNotificationGroupsByClientStatusActionId(clientStatusActionId?: number) {
    if (clientStatusActionId == null || isNaN(clientStatusActionId)) {
      console.error(
        '❌ Facade.loadActionNotificationGroupsByClientStatusActionId called with invalid id:',
        clientStatusActionId
      );
      return;
    }
    this.store.dispatch(Actions.loadActionNotificationGroupsByClientStatusActionId({ clientStatusActionId }));
  }

  /** UPDATED: now expects both id & parent clientStatusActionId */
  delete(id: number, clientStatusActionId: number) {
    this.store.dispatch(Actions.deleteActionNotificationGroup({ id, clientStatusActionId }));
  }
  loadByClientStatusActionId(clientStatusActionId: number) {
    this.store.dispatch(Actions.loadActionNotificationGroupsByClientStatusActionId({ clientStatusActionId }));
  }
}
