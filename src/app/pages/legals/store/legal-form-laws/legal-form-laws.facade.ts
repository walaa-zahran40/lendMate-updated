import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './legal-form-laws.actions';
import * as Selectors from './legal-form-laws.selectors';
import { Observable } from 'rxjs';
import { LegalFormLaw } from './legal-form-law.model';

@Injectable({ providedIn: 'root' })
export class LegalFormLawsFacade {
  items$: Observable<LegalFormLaw[]> = this.store.select(
    Selectors.selectLegalFormLaws
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectLegalFormLawsTotal
  );
  history$: Observable<LegalFormLaw[]> = this.store.select(
    Selectors.selectLegalFormLawsHistory
  );
  current$: Observable<LegalFormLaw | undefined> = this.store.select(
    Selectors.selectCurrentLegalFormLaw
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectLegalFormLawsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectLegalFormLawsError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadLegalFormLaws());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadLegalFormLawsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadLegalFormLaw({ id }));
  }
  create(data: Partial<LegalFormLaw>) {
    this.store.dispatch(Actions.createLegalFormLaw({ data }));
  }
  update(id: any, data: Partial<LegalFormLaw>) {
    this.store.dispatch(Actions.updateLegalFormLaw({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteLegalFormLaw({ id }));
  }
}