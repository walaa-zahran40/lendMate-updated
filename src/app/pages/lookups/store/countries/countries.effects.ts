import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CountryActions from './countries.actions';
import { CountriesService } from './countries.service';

@Injectable()
export class CountriesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            CountryActions.loadCountriesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountriesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            CountryActions.loadCountriesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountry),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((country) =>
            CountryActions.loadCountrySuccess({ country })
          ),
          catchError((error) =>
            of(CountryActions.loadCountryFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.createCountry),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((country) =>
            CountryActions.createCountrySuccess({ country })
          ),
          catchError((error) =>
            of(CountryActions.createCountryFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.updateCountry),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((country) =>
            CountryActions.updateCountrySuccess({ country })
          ),
          catchError((error) =>
            of(CountryActions.updateCountryFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.deleteCountry),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CountryActions.deleteCountrySuccess({ id })),
          catchError((error) =>
            of(CountryActions.deleteCountryFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CountryActions.createCountrySuccess,
        CountryActions.updateCountrySuccess,
        CountryActions.deleteCountrySuccess
      ),
      map(() => CountryActions.loadCountries())
    )
  );
  constructor(
    private actions$: Actions,
    private service: CountriesService
  ) {}
}
