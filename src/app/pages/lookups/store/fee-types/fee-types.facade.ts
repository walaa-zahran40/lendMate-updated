import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './fee-types.actions';
import * as Selectors from './fee-types.selectors';
import { Observable } from 'rxjs';
import { FeeType } from './fee-type.model';

@Injectable({ providedIn: 'root' })
export class  FeeTypesFacade{
  items$: Observable<FeeType[]> = this.store.select(
    Selectors.selectFeeTypes
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectFeeTypesTotal
  );
  history$: Observable<FeeType[]> = this.store.select(
    Selectors.selectFeeTypesHistory
  );
  current$: Observable<FeeType | undefined> = this.store.select(
    Selectors.selectCurrentFeeType
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectFeeTypesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectFeeTypesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadFeeTypes());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadFeeTypesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadFeeType({ id }));
  }
  create(data: Partial<FeeType>) {
    this.store.dispatch(Actions.createFeeType({ data }));
  }
  update(id: any, data: Partial<FeeType>) {
    this.store.dispatch(Actions.updateFeeType({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteFeeType({ id }));
  }
}