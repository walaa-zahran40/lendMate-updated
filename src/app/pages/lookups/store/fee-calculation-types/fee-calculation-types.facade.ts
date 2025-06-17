import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './fee-calculation-types.actions';
import * as Selectors from './fee-calculation-types.selectors';
import { FeeCalculationType } from './fee-calculation-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class FeeCalculationTypesFacade {
  all$ = this.store.select(Selectors.selectAllFeeCalculationTypes);
  loading$ = this.store.select(Selectors.selectFeeCalculationTypesLoading);
  error$ = this.store.select(Selectors.selectFeeCalculationTypesError);
  totalCount$ = this.store.select(
    Selectors.selectFeeCalculationTypesTotalCount
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

  create(payload: Partial<Omit<FeeCalculationType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<FeeCalculationType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectFeeCalculationTypeHistory);

  readonly feeCalculationTypeHistory$ = this.store.select(
    Selectors.selectFeeCalculationTypeHistory
  );
  readonly feeCalculationTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadFeeCalculationTypeHistory());
  }
}
