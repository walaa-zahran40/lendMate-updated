import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './signatory-officers.actions';
import * as Selectors from './signatory-officers.selectors';
import { SignatoryOfficer } from './signatory-officer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class SignatoryOfficersFacade {
  all$ = this.store.select(Selectors.selectAllSignatoryOfficers);
  loading$ = this.store.select(Selectors.selectSignatoryOfficersLoading);
  error$ = this.store.select(Selectors.selectSignatoryOfficersError);
  totalCount$ = this.store.select(Selectors.selectSignatoryOfficersTotalCount);
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

  create(payload: Partial<Omit<SignatoryOfficer, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<SignatoryOfficer>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
