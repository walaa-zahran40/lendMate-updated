import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as LegalFormLawActions from './legal-form-law.actions';
import * as LegalFormLawSelectors from './legal-form-law.selectors';
import { LegalFormLaw } from '../legal-form-laws/legal-form-law.model';

@Injectable({
  providedIn: 'root',
})
export class LegalFormLawFacade {
  legalFormLaws$: Observable<LegalFormLaw[]> = this.store
    .select(LegalFormLawSelectors.selectAllLegalFormLaws)
    .pipe(map((laws) => laws ?? []));

  loading$: Observable<boolean> = this.store.select(
    LegalFormLawSelectors.selectLegalFormLawLoading
  );
  error$: Observable<any> = this.store.select(
    LegalFormLawSelectors.selectLegalFormLawError
  );

  constructor(private store: Store) {}

  loadLegalFormLaws(): void {
    this.store.dispatch(LegalFormLawActions.loadLegalFormLaws());
  }
}
