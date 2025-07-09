import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-clones.actions';
import * as Selectors from './client-clones.selectors';
import { Clone } from './client-clone.model';
import { selectLastOperationSuccess } from '../../../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientsClonesFacade {
  readonly selectedClone$ = this.store.select(Selectors.selectCurrent);
  all$ = this.store.select(Selectors.selectAllClones);
  loading$ = this.store.select(Selectors.selectClonesLoading);
  error$ = this.store.select(Selectors.selectClonesError);
  totalCount$ = this.store.select(Selectors.selectClonesTotalCount);
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
  loadByClientId(id: number) {
    this.store.dispatch(Actions.loadByClientId({ id }));
  }

  create(payload: Partial<Omit<Clone, 'id'>>) {
    this.store.dispatch(Actions.createClone({ payload }));
  }

  update(id: number, changes: Partial<Clone>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClone());
  }
}
