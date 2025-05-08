import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './interest-rate-benchmarks.actions';
import * as Selectors from './interest-rate-benchmarks.selectors';
import { InterestRateBenchMark } from './interest-rate-benchmark.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class InterestRateBenchMarksFacade {
  all$ = this.store.select(Selectors.selectAllInterestRateBenchmarks);
  loading$ = this.store.select(Selectors.selectInterestRateBenchmarksLoading);
  error$ = this.store.select(Selectors.selectInterestRateBenchmarksError);
  totalCount$ = this.store.select(
    Selectors.selectInterestRateBenchmarksTotalCount
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

  create(payload: Partial<Omit<InterestRateBenchMark, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<InterestRateBenchMark>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
