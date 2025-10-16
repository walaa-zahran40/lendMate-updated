import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './governorates.actions';
import * as Selectors from './governorates.selectors';
import { Governorate } from './governorate.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class GovernoratesFacade {
  all$ = this.store.select(Selectors.selectAllGovernorates);
  loading$ = this.store.select(Selectors.selectGovernoratesLoading);
  error$ = this.store.select(Selectors.selectGovernoratesError);
  totalCount$ = this.store.select(Selectors.selectGovernoratesTotalCount);
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

  create(payload: Partial<Omit<Governorate, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Governorate>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectGovernorateHistory);

  readonly governorateHistory$ = this.store.select(
    Selectors.selectGovernorateHistory
  );
  readonly governorateHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadGovernorateHistory());
  }
}
