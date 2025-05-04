import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './sectors.actions';
import * as Selectors from './sectors.selectors';
import { Sector } from './sector.model';

@Injectable({ providedIn: 'root' })
export class SectorsFacade {
  all$ = this.store.select(Selectors.selectAllSectors);
  loading$ = this.store.select(Selectors.selectSectorsLoading);
  error$ = this.store.select(Selectors.selectSectorsError);
  totalCount$ = this.store.select(Selectors.selectSectorsTotalCount);
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

  create(payload: Partial<Omit<Sector, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Sector>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
