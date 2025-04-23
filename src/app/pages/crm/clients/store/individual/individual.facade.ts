import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as IndividualActions from './individual.actions';
import * as IndividualSelectors from './individual.selectors';
import { Individual, IndividualState } from './individual.state';

@Injectable({ providedIn: 'root' })
export class IndividualFacade {
  all$ = this.store.select(IndividualSelectors.selectAllIndividuals);
  totalCount$ = this.store.select(IndividualSelectors.selectTotalCount);
  selected$ = this.store.select(IndividualSelectors.selectSelectedIndividual);
  loading$ = this.store.select(IndividualSelectors.selectLoading);
  error$ = this.store.select(IndividualSelectors.selectError);

  constructor(private store: Store<IndividualState>) {}

  loadAll() {
    this.store.dispatch(IndividualActions.loadIndividuals());
  }
  load(id: number) {
    this.store.dispatch(IndividualActions.loadIndividual({ id }));
  }
  create(payload: Individual) {
    this.store.dispatch(IndividualActions.createIndividual({ payload }));
  }
  update(id: number, changes: Partial<Individual>) {
    this.store.dispatch(IndividualActions.updateIndividual({ id, changes }));
  }
  delete(id: number) {
    this.store.dispatch(IndividualActions.deleteIndividual({ id }));
  }
}
