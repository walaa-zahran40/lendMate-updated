import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './grace-period-units.actions';
import * as Selectors from './grace-period-units.selectors';
import { GracePeriodUnit } from './grace-period-unit.model';

@Injectable({ providedIn: 'root' })
export class GracePeriodUnitsFacade {
  all$ = this.store.select(Selectors.selectAllGracePeriodUnits);
  loading$ = this.store.select(Selectors.selectGracePeriodUnitsLoading);
  error$ = this.store.select(Selectors.selectGracePeriodUnitsError);
  totalCount$ = this.store.select(Selectors.selectGracePeriodUnitsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<GracePeriodUnit, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<GracePeriodUnit>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
