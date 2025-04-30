import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CurrencyActions from './currencies.actions';
import { CurrenciesService } from './currencies.service';

@Injectable()
export class CurrenciesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadCurrencies),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            CurrencyActions.loadCurrenciesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(CurrencyActions.loadCurrenciesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadCurrenciesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            CurrencyActions.loadCurrenciesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(CurrencyActions.loadCurrenciesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadCurrency),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((currency) =>
            CurrencyActions.loadCurrencySuccess({ currency })
          ),
          catchError((error) =>
            of(CurrencyActions.loadCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.createCurrency),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((currency) =>
            CurrencyActions.createCurrencySuccess({ currency })
          ),
          catchError((error) =>
            of(CurrencyActions.createCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.updateCurrency),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((currency) =>
            CurrencyActions.updateCurrencySuccess({ currency })
          ),
          catchError((error) =>
            of(CurrencyActions.updateCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.deleteCurrency),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CurrencyActions.deleteCurrencySuccess({ id })),
          catchError((error) =>
            of(CurrencyActions.deleteCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CurrencyActions.createCurrencySuccess,
        CurrencyActions.updateCurrencySuccess,
        CurrencyActions.deleteCurrencySuccess
      ),
      map(() => CurrencyActions.loadCurrencies())
    )
  );
  constructor(
    private actions$: Actions,
    private service: CurrenciesService
  ) {}
}
