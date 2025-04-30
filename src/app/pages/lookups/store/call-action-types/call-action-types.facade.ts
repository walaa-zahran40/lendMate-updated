import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './call-action-types.actions';
import * as Selectors from './call-action-types.selectors';
import { CallActionType } from './call-action-type.model';

@Injectable({ providedIn: 'root' })
export class CallActionTypesFacade {
  all$ = this.store.select(Selectors.selectAllCallActionTypes);
  loading$ = this.store.select(Selectors.selectCallActionTypesLoading);
  error$ = this.store.select(Selectors.selectCallActionTypesError);
  totalCount$ = this.store.select(Selectors.selectCallActionTypesTotalCount);
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

  create(payload: Partial<Omit<CallActionType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<CallActionType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
