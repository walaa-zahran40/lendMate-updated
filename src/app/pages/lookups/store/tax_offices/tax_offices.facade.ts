import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './tax_offices.actions';
import * as Selectors from './tax_offices.selectors';
import { TaxOffice } from './tax_offices.model';

@Injectable({ providedIn: 'root' })
export class TaxOfficesFacade {
  all$ = this.store.select(Selectors.selectAllTaxOffices);
  loading$ = this.store.select(Selectors.selectTaxOfficesLoading);
  error$ = this.store.select(Selectors.selectTaxOfficesError);
  totalCount$ = this.store.select(Selectors.selectTaxOfficesTotalCount);
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

  create(payload: Partial<Omit<TaxOffice, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<TaxOffice>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
