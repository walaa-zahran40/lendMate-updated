import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './authorization-group-officers.actions';
import * as Selectors from './authorization-group-officers.selectors';
import { AuthorizationGroupOfficer } from './authorization-group-officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AuthorizationGroupOfficersFacade {
  all$ = this.store.select(Selectors.selectAllAuthorizationGroupOfficers);
  loading$ = this.store.select(Selectors.selectAuthorizationGroupOfficersLoading);
  error$ = this.store.select(Selectors.selectAuthorizationGroupOfficersError);
  totalCount$ = this.store.select(Selectors.selectAuthorizationGroupOfficersTotalCount);
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

  create(payload: Partial<Omit<AuthorizationGroupOfficer, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<AuthorizationGroupOfficer>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
