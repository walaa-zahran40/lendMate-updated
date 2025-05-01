import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './businessLines.actions';
import * as Selectors from './businessLines.selectors';
import { Observable } from 'rxjs';
import { BusinessLine } from './businessLine.model';

@Injectable({ providedIn: 'root' })
export class BusinessLinesFacade {
  items$: Observable<BusinessLine[]> = this.store.select(
    Selectors.selectBusinessLines
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectBusinessLinesTotal
  );
  history$: Observable<BusinessLine[]> = this.store.select(
    Selectors.selectBusinessLinesHistory
  );
  current$: Observable<BusinessLine | undefined> = this.store.select(
    Selectors.selectCurrentBusinessLine
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectBusinessLinesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectBusinessLinesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadBusinessLines());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadBusinessLinesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadBusinessLine({ id }));
  }
  create(data: Partial<BusinessLine>) {
    this.store.dispatch(Actions.createBusinessLine({ data }));
  }
  update(id: any, data: Partial<BusinessLine>) {
    this.store.dispatch(Actions.updateBusinessLine({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteBusinessLine({ id }));
  }
}