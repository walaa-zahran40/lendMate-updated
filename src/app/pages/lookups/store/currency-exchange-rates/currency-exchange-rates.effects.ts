import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CurrencyExchangeRateActions from './currency-exchange-rates.actions';
import { CurrencyExchangeRatesService } from './currency-exchange-rates.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CurrencyExchangeRatesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.loadCurrencyExchangeRates),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            CurrencyExchangeRateActions.loadCurrencyExchangeRatesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.loadCurrencyExchangeRatesFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.loadCurrencyExchangeRatesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            CurrencyExchangeRateActions.loadCurrencyExchangeRatesHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.loadCurrencyExchangeRatesHistoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.loadCurrencyExchangeRate),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((currency) =>
            CurrencyExchangeRateActions.loadCurrencyExchangeRateSuccess({
              currency,
            })
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.loadCurrencyExchangeRateFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.createCurrencyExchangeRate),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((currency) =>
            CurrencyExchangeRateActions.createCurrencyExchangeRateSuccess({
              currency,
            })
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.createCurrencyExchangeRateFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.updateCurrencyExchangeRate),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((currency) =>
            CurrencyExchangeRateActions.updateCurrencyExchangeRateSuccess({
              currency,
            })
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.updateCurrencyExchangeRateFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.deleteCurrencyExchangeRate),
      mergeMap(({ id, currencyId }) =>
        this.service.delete(id).pipe(
          map(() =>
            CurrencyExchangeRateActions.deleteCurrencyExchangeRateSuccess({
              id,
              currencyId,
            })
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.deleteCurrencyExchangeRateFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by currencyId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CurrencyExchangeRateActions.createCurrencyExchangeRateSuccess,
        CurrencyExchangeRateActions.updateCurrencyExchangeRateSuccess,
        CurrencyExchangeRateActions.deleteCurrencyExchangeRateSuccess
      ),
      map((action) => {
        // action is one of:
        //  - { currency: CurrencyExchangeRate }  (create/update)
        //  - { id: number; currencyId: number }  (delete)
        const currencyId =
          'currency' in action
            ? action.currency.currencyId!
            : action.currencyId;
        return CurrencyExchangeRateActions.loadCurrencyExchangeRatesByCurrencyId(
          { currencyId }
        );
      })
    )
  );

  // The “by-currencyId” loader
  loadByCurrencyId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyExchangeRateActions.loadCurrencyExchangeRatesByCurrencyId),
      tap(({ currencyId }) =>
        console.log('[Effect] loadByCurrencyId →', currencyId)
      ),
      mergeMap(({ currencyId }) =>
        this.service.getByCurrencyId(currencyId).pipe(
          tap((items) =>
            console.log('[Effect] getByCurrencyId response:', items)
          ),
          map((items) =>
            CurrencyExchangeRateActions.loadCurrencyExchangeRatesByCurrencyIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              CurrencyExchangeRateActions.loadCurrencyExchangeRatesByCurrencyIdFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CurrencyExchangeRatesService
  ) {}
}
