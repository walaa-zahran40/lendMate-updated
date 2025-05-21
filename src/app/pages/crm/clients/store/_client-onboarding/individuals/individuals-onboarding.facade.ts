import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './individuals-onboarding.actions';
import * as Selectors from './individuals-onboarding.selectors';
import { selectLastOperationSuccess } from '../../../../../../shared/store/ui.selectors';
import { IndividualOnboarding } from './individual-onboarding.model';

@Injectable({ providedIn: 'root' })
export class IndividualOnboardingsFacade {
  all$ = this.store.select(Selectors.selectAllIndividualOnboardings);
  loading$ = this.store.select(Selectors.selectIndividualOnboardingsLoading);
  error$ = this.store.select(Selectors.selectIndividualOnboardingsError);
  totalCount$ = this.store.select(
    Selectors.selectIndividualOnboardingsTotalCount
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

  create(payload: Partial<Omit<IndividualOnboarding, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<IndividualOnboarding>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedIndividualOnboarding());
  }
}
