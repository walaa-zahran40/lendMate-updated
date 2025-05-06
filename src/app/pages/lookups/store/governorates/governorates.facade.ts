import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './governorates.actions';
import * as Selectors from './governorates.selectors';
import { Observable } from 'rxjs';
import { Governorate } from './governorate.model';

@Injectable({ providedIn: 'root' })
export class GovernorateFacade {
  items$: Observable<Governorate[]> = this.store.select(
    Selectors.selectGovernorates
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectGovernoratesTotal
  );
  history$: Observable<Governorate[]> = this.store.select(
    Selectors.selectGovernoratesHistory
  );
  current$: Observable<Governorate | undefined> = this.store.select(
    Selectors.selectCurrentGovernorate
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectGovernoratesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectGovernoratesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadGovernorates());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadGovernoratesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadGovernorate({ id }));
  }
  create(data: Partial<Governorate>) {
    this.store.dispatch(Actions.createGovernorate({ data }));
  }
  update(id: any, data: Partial<Governorate>) {
    this.store.dispatch(Actions.updateGovernorate({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteGovernorate({ id }));
  }
}
