import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './leasing-types.actions';
import * as Selectors from './leasing-types.selectors';
import { LeasingType } from './leasing-type.model';

@Injectable({ providedIn: 'root' })
export class LeasingTypesFacade {
  all$ = this.store.select(Selectors.selectAllLeasingTypes);
  loading$ = this.store.select(Selectors.selectLeasingTypesLoading);
  error$ = this.store.select(Selectors.selectLeasingTypesError);
  totalCount$ = this.store.select(Selectors.selectLeasingTypesTotalCount);
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

  create(payload: Partial<Omit<LeasingType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<LeasingType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
