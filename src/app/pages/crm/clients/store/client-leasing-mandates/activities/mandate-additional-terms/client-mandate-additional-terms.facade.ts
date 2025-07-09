import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-mandate-additional-terms.actions';
import * as Selectors from './client-mandate-additional-terms.selectors';
import { MandateAdditionalTerm } from './client-mandate-additional-term.model';
import { selectLastOperationSuccess } from '../../../../../../../shared/store/ui.selectors';
import { filter, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MandateAdditionalTermsFacade {
  // Log absolutely everything (including null)
  readonly selectedMandateAdditionalTerm$ = this.store
    .select(Selectors.selectCurrent)
    .pipe(
      tap((term) =>
        console.log('[Facade:selectedMandateAdditionalTerm$]', term)
      )
    );
  // — or, only log real terms after nulls have been filtered out:
  readonly selectedMandateAdditionalTermNonNull$ = this.store
    .select(Selectors.selectCurrent)
    .pipe(
      filter((t): t is MandateAdditionalTerm => !!t),
      tap((term) =>
        console.log('[Facade:selectedMandateAdditionalTerm (non-null)]', term)
      )
    );

  all$ = this.store.select(Selectors.selectAllMandateAdditionalTerms);
  loading$ = this.store.select(Selectors.selectMandateAdditionalTermsLoading);
  error$ = this.store.select(Selectors.selectMandateAdditionalTermsError);
  totalCount$ = this.store.select(
    Selectors.selectMandateAdditionalTermsTotalCount
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
  /** new: fetch a single additional-term by its ID */
  loadByAdditionalId(id: number) {
    this.store.dispatch(Actions.loadByAdditionalId({ id }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<MandateAdditionalTerm, 'id'>>) {
    this.store.dispatch(Actions.createMandateAdditionalTerm({ payload }));
  }

  update(id: number, changes: Partial<MandateAdditionalTerm>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandateAdditionalTerm());
  }
}
