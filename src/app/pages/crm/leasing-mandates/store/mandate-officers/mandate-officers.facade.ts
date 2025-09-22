import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './mandate-officers.actions';
import * as Selectors from './mandate-officers.selectors';
import { MandateOfficer } from './mandate-officer.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandateOfficersFacade {
  readonly selectedMandateOfficer$ = this.store.select(Selectors.selectCurrent);
  all$ = this.store.select(Selectors.selectAllMandateOfficers);
  loading$ = this.store.select(Selectors.selectMandateOfficersLoading);
  error$ = this.store.select(Selectors.selectMandateOfficersError);
  totalCount$ = this.store.select(Selectors.selectMandateOfficersTotalCount);
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

  create(payload: Partial<Omit<MandateOfficer, 'id'>>) {
    this.store.dispatch(Actions.createMandateOfficer({ payload }));
  }

  update(id: number, changes: Partial<MandateOfficer>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandateOfficer());
  }
}
