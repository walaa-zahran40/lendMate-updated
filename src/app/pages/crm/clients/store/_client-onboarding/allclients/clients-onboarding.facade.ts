import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './clients-onboarding.actions';
import * as Selectors from './clients-onboarding.selectors';
import { selectLastOperationSuccess } from '../../../../../../shared/store/ui.selectors';
import { ClientOnboarding } from './client-onboarding.model';

@Injectable({ providedIn: 'root' })
export class ClientsOnboardingFacade {
  all$ = this.store.select(Selectors.selectAllClientsOnboarding);
  loading$ = this.store.select(Selectors.selectClientsOnboardingLoading);
  error$ = this.store.select(Selectors.selectClientsOnboardingError);
  totalCount$ = this.store.select(Selectors.selectClientsOnboardingTotalCount);
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

  create(payload: Partial<Omit<ClientOnboarding, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<ClientOnboarding>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClientOnboarding());
  }
}
