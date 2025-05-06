import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './mandate-validity-units.actions';
import * as Selectors from './mandate-validity-units.selectors';
import { MandateValidityUnit } from './mandate-validity-units.model';

@Injectable({ providedIn: 'root' })
export class MandateValidityUnitsFacade {
  all$ = this.store.select(Selectors.selectAllMandateValidityUnits);
  loading$ = this.store.select(Selectors.selectMandateValidityUnitsLoading);
  error$ = this.store.select(Selectors.selectMandateValidityUnitsError);
  totalCount$ = this.store.select(Selectors.selectMandateValidityUnitsTotalCount);
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

  create(payload: Partial<Omit<MandateValidityUnit, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<MandateValidityUnit>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
