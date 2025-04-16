import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as LegalFormActions from './legal-form.actions';
import * as LegalFormSelectors from './legal-form.selectors';
import { LegalForm } from '../../../../../shared/interfaces/legal-form.interface';

@Injectable({
  providedIn: 'root',
})
export class LegalFormFacade {
  // Observable of all legal forms
  legalForms$ = this.store.select(LegalFormSelectors.selectAllLegalForms).pipe(
    map((forms) => forms ?? []) // convert null to []
  );

  // Optional: loading and error observables
  loading$: Observable<boolean> = this.store.select(
    LegalFormSelectors.selectLegalFormLoading
  );
  error$: Observable<any> = this.store.select(
    LegalFormSelectors.selectLegalFormError
  );

  constructor(private store: Store) {}

  // Dispatch action to load legal forms
  loadLegalForms(): void {
    this.store.dispatch(LegalFormActions.loadLegalForms());
  }
}
