import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './company-types.actions';
import * as Selectors from './company-types.selectors';
import { Observable } from 'rxjs';
import { CompanyType } from './company-type.model';

@Injectable({ providedIn: 'root' })
export class CompanyTypesFacade {
  items$: Observable<CompanyType[]> = this.store.select(
    Selectors.selectCompanyTypes
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectCompanyTypesTotal
  );
  history$: Observable<CompanyType[]> = this.store.select(
    Selectors.selectCompanyTypesHistory
  );
  current$: Observable<CompanyType | undefined> = this.store.select(
    Selectors.selectCurrentCompanyType
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectCompanyTypesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectCompanyTypesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadCompanyTypes());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadCompanyTypesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadCompanyType({ id }));
  }
  create(data: Partial<CompanyType>) {
    this.store.dispatch(Actions.createCompanyType({ data }));
  }
  update(id: any, data: Partial<CompanyType>) {
    this.store.dispatch(Actions.updateCompanyType({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteCompanyType({ id }));
  }
}
