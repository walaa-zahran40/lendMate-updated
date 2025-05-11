import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './legal-forms.actions';
import * as Selectors from './legal-forms.selectors';
import { Observable } from 'rxjs';
import { LegalForm } from './legal-form.model';

@Injectable({ providedIn: 'root' })
export class LegalFormsFacade {
  items$: Observable<LegalForm[]> = this.store.select(
    Selectors.selectLegalForms
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectLegalFormsTotal
  );
  history$: Observable<LegalForm[]> = this.store.select(
    Selectors.selectLegalFormsHistory
  );
  current$: Observable<LegalForm | undefined> = this.store.select(
    Selectors.selectCurrentLegalForm
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectLegalFormsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectLegalFormsError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadLegalForms());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadLegalFormsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadLegalForm({ id }));
  }
  create(data: Partial<LegalForm>) {
    this.store.dispatch(Actions.createLegalForm({ data }));
  }
  update(id: any, data: Partial<LegalForm>) {
    this.store.dispatch(Actions.updateLegalForm({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteLegalForm({ id }));
  }
}