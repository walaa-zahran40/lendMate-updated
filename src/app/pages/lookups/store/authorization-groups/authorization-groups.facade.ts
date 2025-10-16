import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './authorization-groups.actions';
import * as Selectors from './authorization-groups.selectors';
import { AuthorizationGroup } from './authorization-group.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class AuthorizationGroupsFacade {
  all$ = this.store.select(Selectors.selectAllAuthorizationGroups);
  loading$ = this.store.select(Selectors.selectAuthorizationGroupsLoading);
  error$ = this.store.select(Selectors.selectAuthorizationGroupsError);
  totalCount$ = this.store.select(
    Selectors.selectAuthorizationGroupsTotalCount
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

  create(payload: Partial<Omit<AuthorizationGroup, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<AuthorizationGroup>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  history$ = this.store.select(Selectors.selectAuthorizationGroupHistory);

  readonly authorizationGroupHistory$ = this.store.select(
    Selectors.selectAuthorizationGroupHistory
  );
  readonly authorizationGroupHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadAuthorizationGroupHistory());
  }
}
