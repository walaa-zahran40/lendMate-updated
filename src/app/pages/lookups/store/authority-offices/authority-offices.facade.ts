import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './authority-offices.actions';
import * as Selectors from './authority-offices.selectors';
import { AuthorityOffice } from './authority-office.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AuthorityOfficesFacade {
  all$ = this.store.select(Selectors.selectAllAuthorityOffices);
  loading$ = this.store.select(Selectors.selectAuthorityOfficesLoading);
  error$ = this.store.select(Selectors.selectAuthorityOfficesError);
  totalCount$ = this.store.select(Selectors.selectAuthorityOfficesTotalCount);
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

  create(payload: Partial<Omit<AuthorityOffice, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<AuthorityOffice>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
