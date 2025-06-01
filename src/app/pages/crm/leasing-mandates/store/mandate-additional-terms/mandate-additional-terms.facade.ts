import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './mandate-additional-terms.actions';
import * as Selectors from './mandate-additional-terms.selectors';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandateAdditionalTermsFacade {
  readonly selectedMandateAdditionalTerm$ = this.store.select(
    Selectors.selectCurrent
  );
  all$ = this.store.select(Selectors.selectAllMandateAdditionalTerms);
  loading$ = this.store.select(Selectors.selectMandateAdditionalTermsLoading);
  error$ = this.store.select(Selectors.selectMandateAdditionalTermsError);
  totalCount$ = this.store.select(
    Selectors.selectMandateAdditionalTermsTotalCount
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

  create(payload: Partial<Omit<MandateAdditionalTerm, 'id'>>) {
    this.store.dispatch(Actions.createMandateAdditionalTerm({ payload }));
  }

  update(id: number, changes: Partial<MandateAdditionalTerm>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandateAdditionalTerm());
  }
}
