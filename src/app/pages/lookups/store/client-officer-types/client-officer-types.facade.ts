import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-officer-types.actions';
import * as Selectors from './client-officer-types.selectors';
import { ClientOfficerType } from './client-officer-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientOfficerTypesFacade {
  all$ = this.store.select(Selectors.selectAllClientOfficerTypes);
  loading$ = this.store.select(Selectors.selectClientOfficerTypesLoading);
  error$ = this.store.select(Selectors.selectClientOfficerTypesError);
  totalCount$ = this.store.select(Selectors.selectClientOfficerTypesTotalCount);
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

  create(payload: Partial<Omit<ClientOfficerType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<ClientOfficerType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
