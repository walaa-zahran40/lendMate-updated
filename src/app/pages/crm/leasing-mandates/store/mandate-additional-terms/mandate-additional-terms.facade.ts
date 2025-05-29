import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './mandate-additional-terms.actions';
import * as Selectors from './mandate-additional-terms.selectors';
import { Observable } from 'rxjs';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandateAdditionalTermsFacade {
  items$: Observable<MandateAdditionalTerm[]> = this.store.select(
    Selectors.selectMandateAdditionalTerms
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectMandateAdditionalTermsTotal
  );
  history$: Observable<MandateAdditionalTerm[]> = this.store.select(
    Selectors.selectMandateAdditionalTermsHistory
  );
  current$: Observable<MandateAdditionalTerm | undefined> = this.store.select(
    Selectors.selectCurrentMandateAdditionalTerm
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectMandateAdditionalTermsLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectMandateAdditionalTermsError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadMandateAdditionalTerms());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadMandateAdditionalTermsHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadMandateAdditionalTerm({ id }));
  }
  create(data: Partial<MandateAdditionalTerm>) {
    this.store.dispatch(Actions.createMandateAdditionalTerm({ data }));
  }
  update(id: any, data: Partial<MandateAdditionalTerm>) {
    this.store.dispatch(Actions.updateMandateAdditionalTerm({ id, data }));
  }
  /** NEW: dispatch the by-mandateId loader */
  loadMandateAdditionalTermsByClientId(mandateId?: number) {
    if (mandateId == null || isNaN(mandateId)) {
      console.error(
        '❌ Facade.loadMandateAdditionalTermsByClientId called with invalid id:',
        mandateId
      );
      return;
    }
    this.store.dispatch(Actions.loadMandateAdditionalTermsByClientId({ mandateId }));
  }

  /** UPDATED: now expects both id & parent mandateId */
  delete(id: number, mandateId: number) {
    this.store.dispatch(Actions.deleteMandateAdditionalTerm({ id, mandateId }));
  }
  loadByClientId(mandateId: number) {
    this.store.dispatch(Actions.loadMandateAdditionalTermsByClientId({ mandateId }));
  }
}
