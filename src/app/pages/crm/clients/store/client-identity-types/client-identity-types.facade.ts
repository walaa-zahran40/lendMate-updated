import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-identity-types.actions';
import * as Selectors from './client-identity-types.selectors';
import { ClientIdentityType } from './client-identity-type.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class ClientIdentityTypesFacade {
  all$ = this.store.select(Selectors.selectAllClientIdentityTypes);
  loading$ = this.store.select(Selectors.selectClientIdentityTypesLoading);
  error$ = this.store.select(Selectors.selectClientIdentityTypesError);
  totalCount$ = this.store.select(
    Selectors.selectClientIdentityTypesTotalCount
  );
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

  create(payload: Partial<Omit<ClientIdentityType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<ClientIdentityType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
