import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './countries.actions';
import * as Selectors from './countries.selectors';
import { Observable } from 'rxjs';
import { Country } from './country.model';

@Injectable({ providedIn: 'root' })
export class CountriesFacade {
  items$: Observable<Country[]> = this.store.select(
    Selectors.selectCountries
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectCountriesTotal
  );
  history$: Observable<Country[]> = this.store.select(
    Selectors.selectCountriesHistory
  );
  current$: Observable<Country | undefined> = this.store.select(
    Selectors.selectCurrentCountry
  );
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectCountriesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectCountriesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadCountries());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadCountriesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadCountry({ id }));
  }
  create(data: Partial<Country>) {
    this.store.dispatch(Actions.createCountry({ data }));
  }
  update(id: any, data: Partial<Country>) {
    this.store.dispatch(Actions.updateCountry({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteCountry({ id }));
  }
}
