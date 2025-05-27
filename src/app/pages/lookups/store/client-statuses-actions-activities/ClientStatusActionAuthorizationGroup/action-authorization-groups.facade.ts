import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { ActionAuthorizationGroup } from './action-authorization-group.model';
import * as Selectors from './action-authorization-groups.selectors';
import * as Actions from './action-authorization-groups.actions';

@Injectable({ providedIn: 'root' })
export class ActionAuthorizationGroupsFacade {
  items$: Observable<ActionAuthorizationGroup[]> = this.store.select(
    Selectors.selectActionAuthorizationGroups
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectActionAuthorizationGroupsTotal
  );
  history$: Observable<ActionAuthorizationGroup[]> = this.store.select(
    Selectors.selectActionAuthorizationGroupsHistory
  );
  current$: Observable<ActionAuthorizationGroup | undefined> = this.store.select(
    Selectors.selectCurrentActionAuthorizationGroup
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectActionAuthorizationGroupsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectActionAuthorizationGroupsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadActionAuthorizationGroups());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadActionAuthorizationGroupsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadActionAuthorizationGroup({ id }));
  }
  create(data: Partial<ActionAuthorizationGroup>) {
    this.store.dispatch(Actions.createActionAuthorizationGroup({ data }));
  }
  update(id: any, data: Partial<ActionAuthorizationGroup>) {
    this.store.dispatch(Actions.updateActionAuthorizationGroup({ id, data }));
  }
  /** NEW: dispatch the by-clientStatusActionId loader */
  loadActionAuthorizationGroupsByClientStatusActionId(clientStatusActionId?: number) {
    if (clientStatusActionId == null || isNaN(clientStatusActionId)) {
      console.error(
        '❌ Facade.loadActionAuthorizationGroupsByClientStatusActionId called with invalid id:',
        clientStatusActionId
      );
      return;
    }
    this.store.dispatch(Actions.loadActionAuthorizationGroupsByClientStatusActionId({ clientStatusActionId }));
  }

  /** UPDATED: now expects both id & parent clientStatusActionId */
  delete(id: number, clientStatusActionId: number) {
    this.store.dispatch(Actions.deleteActionAuthorizationGroup({ id, clientStatusActionId }));
  }
  loadByClientStatusActionId(clientStatusActionId: number) {
    this.store.dispatch(Actions.loadActionAuthorizationGroupsByClientStatusActionId({ clientStatusActionId }));
  }
}
