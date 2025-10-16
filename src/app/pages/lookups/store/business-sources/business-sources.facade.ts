import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './business-sources.actions';
import * as Selectors from './business-sources.selectors';
import { BusinessSource } from './business-source.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class BusinessSourcesFacade {
  all$ = this.store.select(Selectors.selectAllBusinessSources);
  loading$ = this.store.select(Selectors.selectBusinessSourcesLoading);
  error$ = this.store.select(Selectors.selectBusinessSourcesError);
  totalCount$ = this.store.select(Selectors.selectBusinessSourcesTotalCount);
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

  create(payload: Partial<Omit<BusinessSource, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<BusinessSource>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  readonly businessSourceHistory$ = this.store.select(Selectors.selectHistory);
  readonly businessSourceHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadBusinessSourceHistory());
  }
}
