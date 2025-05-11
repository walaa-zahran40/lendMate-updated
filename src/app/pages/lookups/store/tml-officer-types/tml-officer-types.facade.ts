import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './tml-officer-types.actions';
import * as Selectors from './tml-officer-types.selectors';
import { TmlOfficerType } from './tml-officer-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmlOfficerTypesFacade {
  all$: Observable<TmlOfficerType[]> = this.store.select(
    Selectors.selectAllTmlOfficerTypes
  );
  loading$ = this.store.select(Selectors.selectTmlOfficerTypesLoading);
  error$ = this.store.select(Selectors.selectTmlOfficerTypesError);
  totalCount$ = this.store.select(Selectors.selectTmlOfficerTypesTotalCount);
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

  create(payload: Partial<Omit<TmlOfficerType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<TmlOfficerType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
