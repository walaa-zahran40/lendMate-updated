import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MandateFeeActions from './mandate-fees.actions';
import { MandateFeesService } from './mandate-fees.service';
import { MandateFee } from './mandate-fee.model';

@Injectable()
export class MandateFeesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateFeeActions.loadMandateFees),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            MandateFeeActions.loadMandateFeesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              MandateFeeActions.loadMandateFeesFailure({
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
      ofType(MandateFeeActions.loadMandateFeesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            MandateFeeActions.loadMandateFeesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(MandateFeeActions.loadMandateFeesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateFeeActions.loadMandateFee),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((mandate) =>
            MandateFeeActions.loadMandateFeeSuccess({
              mandate,
            })
          ),
          catchError((error) =>
            of(
              MandateFeeActions.loadMandateFeeFailure({
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
      ofType(MandateFeeActions.createMandateFee),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((mandate) =>
            MandateFeeActions.createMandateFeeSuccess({
              mandate,
            })
          ),
          catchError((error) =>
            of(
              MandateFeeActions.createMandateFeeFailure({
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
      ofType(MandateFeeActions.updateMandateFee),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject mandateId if missing
            const enriched: MandateFee = {
              ...serverReturned,
              mandateId: data.mandateId!,
            };
            console.log('[Effect:update] enriched mandate →', enriched);
            return MandateFeeActions.updateMandateFeeSuccess({
              mandate: enriched,
            });
          }),
          catchError((error) =>
            of(
              MandateFeeActions.updateMandateFeeFailure({
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
      ofType(MandateFeeActions.deleteMandateFee),
      mergeMap(({ id, mandateId }) =>
        this.service.delete(id).pipe(
          map(() =>
            MandateFeeActions.deleteMandateFeeSuccess({
              id,
              mandateId,
            })
          ),
          catchError((error) =>
            of(
              MandateFeeActions.deleteMandateFeeFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by mandateId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateFeeActions.createMandateFeeSuccess,
        MandateFeeActions.updateMandateFeeSuccess,
        MandateFeeActions.deleteMandateFeeSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const Id = 'mandate' in action ? action.mandate.id : action.mandateId;
        console.log('[RefreshList] extracted mandateId →', Id);
        return Id;
      }),

      // only continue if it’s a number
      filter((mandateId): mandateId is number => typeof mandateId === 'number'),

      map((mandateId) =>
        MandateFeeActions.loadMandateFeesByMandateId({
          mandateId,
        })
      )
    )
  );

  /**
   * The “by‐mandateId” loader
   */
  loadByMandateId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateFeeActions.loadMandateFeesByMandateId),

      tap((action) =>
        console.log('[Effect:loadByMandateId] full action →', action)
      ),
      tap(({ mandateId }) =>
        console.log('[Effect:loadByMandateId] mandateId →', mandateId)
      ),

      mergeMap(({ mandateId }) =>
        this.service.getByMandateId(mandateId).pipe(
          tap((items) =>
            console.log('[Effect:loadByMandateId] response →', items)
          ),
          map((items) =>
            MandateFeeActions.loadMandateFeesByMandateIdSuccess({ items })
          ),
          catchError((error) =>
            of(MandateFeeActions.loadMandateFeesByMandateIdFailure({ error }))
          )
        )
      )
    )
  );
  loadCalcConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateFeeActions.loadCalcConfig),
      mergeMap(({ feeTypeId }) =>
        this.service.getCalculationConfigurationByFeeTypeId(feeTypeId).pipe(
          map((config) => MandateFeeActions.loadCalcConfigSuccess({ config })),
          catchError((error) =>
            of(
              MandateFeeActions.loadCalcConfigFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: MandateFeesService) {}
}
