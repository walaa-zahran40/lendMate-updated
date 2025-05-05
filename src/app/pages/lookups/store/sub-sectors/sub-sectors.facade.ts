import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './sub-sectors.actions';
import * as Selectors from './sub-sectors.selectors';
import { SubSector } from './sub-sector.model';

@Injectable({ providedIn: 'root' })
export class SubSectorsFacade {
  all$ = this.store.select(Selectors.selectAllSubSectors);
  loading$ = this.store.select(Selectors.selectSubSectorsLoading);
  error$ = this.store.select(Selectors.selectSubSectorsError);
  totalCount$ = this.store.select(Selectors.selectSubSectorsTotalCount);
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

  create(payload: Partial<Omit<SubSector, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<SubSector>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
