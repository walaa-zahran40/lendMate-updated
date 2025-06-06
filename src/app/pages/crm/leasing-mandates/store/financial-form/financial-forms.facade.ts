import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './financial-forms.actions';
import * as Selectors from './financial-forms.selectors';
import { FinancialForm } from './financial-form.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

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
  constructor(private store: Store) {}

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
  }
  calculate(payload: Omit<FinancialForm, 'id'>) {
    this.store.dispatch(Actions.calculateEntity({ payload }));
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
}
