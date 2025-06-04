import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { MandateActionAuthorizationGroup } from './action-authorization-group.model';
import * as Selectors from './action-authorization-groups.selectors';
import * as Actions from './action-authorization-groups.actions';

@Injectable({ providedIn: 'root' })
export class MandateActionAuthorizationGroupsFacade {
  items$: Observable<MandateActionAuthorizationGroup[]> = this.store.select(
    Selectors.selectMandateActionAuthorizationGroups
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectMandateActionAuthorizationGroupsTotal
  );
  history$: Observable<MandateActionAuthorizationGroup[]> = this.store.select(
    Selectors.selectMandateActionAuthorizationGroupsHistory
  );
  current$: Observable<MandateActionAuthorizationGroup | undefined> = this.store.select(
    Selectors.selectCurrentMandateActionAuthorizationGroup
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectMandateActionAuthorizationGroupsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectMandateActionAuthorizationGroupsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadMandateActionAuthorizationGroups());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadMandateActionAuthorizationGroupsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadMandateActionAuthorizationGroup({ id }));
  }
  create(data: Partial<MandateActionAuthorizationGroup>) {
    this.store.dispatch(Actions.createMandateActionAuthorizationGroup({ data }));
  }
  update(id: any, data: Partial<MandateActionAuthorizationGroup>) {
    this.store.dispatch(Actions.updateMandateActionAuthorizationGroup({ id, data }));
  }
  /** NEW: dispatch the by-mandateStatusActionId loader */
  loadMandateActionAuthorizationGroupsByMandateStatusActionId(mandateStatusActionId?: number) {
    if (mandateStatusActionId == null || isNaN(mandateStatusActionId)) {
      console.error(
        '❌ Facade.loadMandateActionAuthorizationGroupsByMandateStatusActionId called with invalid id:',
        mandateStatusActionId
      );
      return;
    }
    this.store.dispatch(Actions.loadMandateActionAuthorizationGroupsByMandateStatusActionId({ mandateStatusActionId }));
  }

  /** UPDATED: now expects both id & parent mandateStatusActionId */
  delete(id: number, mandateStatusActionId: number) {
    this.store.dispatch(Actions.deleteMandateActionAuthorizationGroup({ id, mandateStatusActionId }));
  }
  loadByMandateStatusActionId(mandateStatusActionId: number) {
    this.store.dispatch(Actions.loadMandateActionAuthorizationGroupsByMandateStatusActionId({ mandateStatusActionId }));
  }
}
