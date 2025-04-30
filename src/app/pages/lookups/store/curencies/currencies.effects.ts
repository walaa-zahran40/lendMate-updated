import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CompanyActions from './currencies.actions';
import { CurrenciesService } from './currencies.service';

@Injectable()
export class CurrenciesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCurrencies),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            CompanyActions.loadCurrenciesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(CompanyActions.loadCurrenciesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCurrenciesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            CompanyActions.loadCurrenciesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(CompanyActions.loadCurrenciesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCurrency),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((Currency) =>
            CompanyActions.loadCurrenciesuccess({ Currency })
          ),
          catchError((error) =>
            of(CompanyActions.loadCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.createCurrency),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((Currency) =>
            CompanyActions.createCurrenciesuccess({ Currency })
          ),
          catchError((error) =>
            of(CompanyActions.createCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.updateCurrency),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((Currency) =>
            CompanyActions.updateCurrenciesuccess({ Currency })
          ),
          catchError((error) =>
            of(CompanyActions.updateCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.deleteCurrency),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CompanyActions.deleteCurrenciesuccess({ id })),
          catchError((error) =>
            of(CompanyActions.deleteCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyActions.createCurrenciesuccess,
        CompanyActions.updateCurrenciesuccess,
        CompanyActions.deleteCurrenciesuccess
      ),
      map(() => CompanyActions.loadCurrencies())
    )
  );
  constructor(
    private actions$: Actions,
    private service: CurrenciesService
  ) {}
}
