import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './mandate-fees.actions';
import * as Selectors from './mandate-fees.selectors';
import { Observable } from 'rxjs';
import { MandateFee } from './mandate-fee.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandateFeesFacade {
  items$: Observable<MandateFee[]> = this.store.select(
    Selectors.selectMandateFees
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectMandateFeesTotal
  );
  history$: Observable<MandateFee[]> = this.store.select(
    Selectors.selectMandateFeesHistory
  );
  current$: Observable<MandateFee | undefined> = this.store.select(
    Selectors.selectCurrentMandateFee
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectMandateFeesLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectMandateFeesError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  calcConfig$ = this.store.select(Selectors.selectCalcConfig);
  calcConfigLoading$ = this.store.select(Selectors.selectCalcConfigLoading);
  calcConfigError$ = this.store.select(Selectors.selectCalcConfigError);
  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadMandateFees());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadMandateFeesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadMandateFee({ id }));
  }
  create(data: Partial<MandateFee>) {
    this.store.dispatch(Actions.createMandateFee({ data }));
  }
  update(id: any, data: Partial<MandateFee>) {
    this.store.dispatch(Actions.updateMandateFee({ id, data }));
  }
  /** NEW: dispatch the by-mandateId loader */
  loadMandateFeesByClientId(mandateId?: number) {
    if (mandateId == null || isNaN(mandateId)) {
      console.error(
        '❌ Facade.loadMandateFeesByClientId called with invalid id:',
        mandateId
      );
      return;
    }
    this.store.dispatch(Actions.loadMandateFeesByMandateId({ mandateId }));
  }

  /** UPDATED: now expects both id & parent mandateId */
  delete(id: number, mandateId: number) {
    this.store.dispatch(Actions.deleteMandateFee({ id, mandateId }));
  }
  loadByMandateId(mandateId: number) {
    this.store.dispatch(Actions.loadMandateFeesByMandateId({ mandateId }));
  }
  loadCalcConfig(feeTypeId: number) {
    this.store.dispatch(Actions.loadCalcConfig({ feeTypeId }));
  }
}
