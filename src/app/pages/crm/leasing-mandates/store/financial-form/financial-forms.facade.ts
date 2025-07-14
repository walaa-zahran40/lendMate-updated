import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './financial-forms.actions';
import * as Selectors from './financial-forms.selectors';
import { FinancialForm } from './financial-form.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { filter, first, map } from 'rxjs';
import { Actions as effectAction, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class FinancialFormsFacade {
  current$ = this.store.select(Selectors.selectCurrentFinancialForm); // ✅ this exists
  all$ = this.store.select(Selectors.selectAllFinancialForms);
  loading$ = this.store.select(Selectors.selectFinancialFormsLoading);
  error$ = this.store.select(Selectors.selectFinancialFormsError);
  totalCount$ = this.store.select(Selectors.selectFinancialFormsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  calcConfig$ = this.store.select(Selectors.selectCalcConfig);
  calcConfigLoading$ = this.store.select(Selectors.selectCalcConfigLoading);
  calcConfigError$ = this.store.select(Selectors.selectCalcConfigError);

  constructor(private store: Store, private actions$: effectAction) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }
  loadByLeasingMandateId(leasingMandateId: number) {
    this.store.dispatch(Actions.loadByLeasingMandateId({ leasingMandateId }));
  }
  create(payload: Partial<Omit<FinancialForm, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
    return this.actions$.pipe(
      ofType(Actions.createEntitySuccess),
      filter(
        ({ entity }) => entity.leasingMandateId === payload.leasingMandateId
      ),
      map(({ entity }) => entity),
      first() // auto-completes after first match
    );
  }
  calculate(payload: Omit<FinancialForm, 'id'>) {
    this.store.dispatch(Actions.calculateEntity({ payload }));
    return this.actions$.pipe(
      ofType(Actions.calculateEntitySuccess),
      filter(
        ({ entity }) => entity.leasingMandateId === payload.leasingMandateId
      ),
      map(({ entity }) => entity),
      first() // auto-completes after first match
    );
  }
  update(id: number, changes: Partial<FinancialForm>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedFinancialForm());
  }
  loadCalcConfig(feeTypeId: number) {
    this.store.dispatch(Actions.loadCalcConfig({ feeTypeId }));
  }
}
