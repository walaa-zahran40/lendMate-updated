import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './mandate-fees.actions';
import * as Selectors from './mandate-fees.selectors';
import { MandateFee } from './mandate-fee.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandateFeesFacade {
  readonly selectedMandateFee$ = this.store.select(Selectors.selectCurrent);
  all$ = this.store.select(Selectors.selectAllMandateFees);
  loading$ = this.store.select(Selectors.selectMandateFeesLoading);
  error$ = this.store.select(Selectors.selectMandateFeesError);
  totalCount$ = this.store.select(Selectors.selectMandateFeesTotalCount);
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

  create(payload: Partial<Omit<MandateFee, 'id'>>) {
    this.store.dispatch(Actions.createMandateFee({ payload }));
  }

  update(id: number, changes: Partial<MandateFee>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandateFee());
  }
}
