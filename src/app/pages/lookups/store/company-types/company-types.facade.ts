import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './company-types.actions';
import * as Selectors from './company-types.selectors';
import { CompanyType } from './company-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class CompanyTypesFacade {
  all$ = this.store.select(Selectors.selectAllCompanyTypes);
  loading$ = this.store.select(Selectors.selectCompanyTypesLoading);
  error$ = this.store.select(Selectors.selectCompanyTypesError);
  totalCount$ = this.store.select(Selectors.selectCompanyTypesTotalCount);
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

  create(payload: Partial<Omit<CompanyType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<CompanyType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectCompanyTypeHistory);

  readonly companyTypeHistory$ = this.store.select(
    Selectors.selectCompanyTypeHistory
  );
  readonly companyTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadCompanyTypeHistory());
  }
}
