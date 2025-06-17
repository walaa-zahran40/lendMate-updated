import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { MandateActionNotificationGroup } from './action-notification-group.model';
import * as Selectors from './action-notification-groups.selectors';
import * as Actions from './action-notification-groups.actions';

@Injectable({ providedIn: 'root' })
export class MandateActionNotificationGroupsFacade {
  items$: Observable<MandateActionNotificationGroup[]> = this.store.select(
    Selectors.selectMandateActionNotificationGroups
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectMandateActionNotificationGroupsTotal
  );

  current$: Observable<MandateActionNotificationGroup | undefined> =
    this.store.select(Selectors.selectCurrentMandateActionNotificationGroup);

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectMandateActionNotificationGroupsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectMandateActionNotificationGroupsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadMandateActionNotificationGroups());
  }

  loadOne(id: number) {
    this.store.dispatch(Actions.loadMandateActionNotificationGroup({ id }));
  }
  create(data: Partial<MandateActionNotificationGroup>) {
    this.store.dispatch(Actions.createMandateActionNotificationGroup({ data }));
  }
  update(id: any, data: Partial<MandateActionNotificationGroup>) {
    this.store.dispatch(
      Actions.updateMandateActionNotificationGroup({ id, data })
    );
  }
  /** NEW: dispatch the by-mandateStatusActionId loader */
  loadActionNotificationGroupsByMandateStatusActionId(
    mandateStatusActionId?: number
  ) {
    if (mandateStatusActionId == null || isNaN(mandateStatusActionId)) {
      console.error(
        '❌ Facade.loadMandateActionNotificationGroupsByMandateStatusActionId called with invalid id:',
        mandateStatusActionId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadMandateActionNotificationGroupsByMandateStatusActionId({
        mandateStatusActionId,
      })
    );
  }

  /** UPDATED: now expects both id & parent mandateStatusActionId */
  delete(id: number, mandateStatusActionId: number) {
    this.store.dispatch(
      Actions.deleteMandateActionNotificationGroup({
        id,
        mandateStatusActionId,
      })
    );
  }
  loadByMandateStatusActionId(mandateStatusActionId: number) {
    this.store.dispatch(
      Actions.loadMandateActionNotificationGroupsByMandateStatusActionId({
        mandateStatusActionId,
      })
    );
  }
  //History management
  history$ = this.store.select(
    Selectors.selectMandateActionNotificationGroupHistory
  );

  readonly mandateActionNotificationHistory$ = this.store.select(
    Selectors.selectMandateActionNotificationGroupHistory
  );
  readonly mandateActionNotificationHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadMandateActionNotificationGroupHistory());
  }
}
