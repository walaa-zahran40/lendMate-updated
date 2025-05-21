import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './individuals.actions';
import * as Selectors from './individuals.selectors';
import { selectLastOperationSuccess } from '../../../../../../shared/store/ui.selectors';
import { Individual } from './individual.model';

@Injectable({ providedIn: 'root' })
export class IndividualsFacade {
  all$ = this.store.select(Selectors.selectAllIndividuals);
  loading$ = this.store.select(Selectors.selectIndividualsLoading);
  error$ = this.store.select(Selectors.selectIndividualsError);
  totalCount$ = this.store.select(Selectors.selectIndividualsTotalCount);
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

  create(payload: Partial<Omit<Individual, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Individual>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedIndividual());
  }
}
