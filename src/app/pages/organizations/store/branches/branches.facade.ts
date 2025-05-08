import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './branches.actions';
import * as Selectors from './branches.selectors';
import { Branch } from './branch.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class BranchesFacade {
  all$ = this.store.select(Selectors.selectAllBranches);
  loading$ = this.store.select(Selectors.selectBranchesLoading);
  error$ = this.store.select(Selectors.selectBranchesError);
  totalCount$ = this.store.select(Selectors.selectBranchesTotalCount);
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

  create(payload: Partial<Omit<Branch, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Branch>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
