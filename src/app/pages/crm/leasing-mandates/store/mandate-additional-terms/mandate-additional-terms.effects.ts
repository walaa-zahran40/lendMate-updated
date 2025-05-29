import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MandateAdditionalTermActions from './mandate-additional-terms.actions';
import { MandateAdditionalTermsService } from './mandate-additional-terms.service';
import { MandateAdditionalTerm } from './mandate-additional-term.model';

@Injectable()
export class MandateAdditionalTermsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateAdditionalTermActions.loadMandateAdditionalTerms),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            MandateAdditionalTermActions.loadMandateAdditionalTermsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.loadMandateAdditionalTermsFailure({
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
      ofType(MandateAdditionalTermActions.loadMandateAdditionalTermsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            MandateAdditionalTermActions.loadMandateAdditionalTermsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.loadMandateAdditionalTermsHistoryFailure(
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
      ofType(MandateAdditionalTermActions.loadMandateAdditionalTerm),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((mandate) =>
            MandateAdditionalTermActions.loadMandateAdditionalTermSuccess({
              mandate,
            })
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.loadMandateAdditionalTermFailure({
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
      ofType(MandateAdditionalTermActions.createMandateAdditionalTerm),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((mandate) =>
            MandateAdditionalTermActions.createMandateAdditionalTermSuccess({
              mandate,
            })
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.createMandateAdditionalTermFailure({
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
      ofType(MandateAdditionalTermActions.updateMandateAdditionalTerm),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject mandateId if missing
            const enriched: MandateAdditionalTerm = {
              ...serverReturned,
              mandateId: data.mandateId!,
            };
            console.log('[Effect:update] enriched mandate →', enriched);
            return MandateAdditionalTermActions.updateMandateAdditionalTermSuccess(
              { mandate: enriched }
            );
          }),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.updateMandateAdditionalTermFailure({
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
      ofType(MandateAdditionalTermActions.deleteMandateAdditionalTerm),
      mergeMap(({ id, mandateId }) =>
        this.service.delete(id).pipe(
          map(() =>
            MandateAdditionalTermActions.deleteMandateAdditionalTermSuccess({
              id,
              mandateId,
            })
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.deleteMandateAdditionalTermFailure({
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
        MandateAdditionalTermActions.createMandateAdditionalTermSuccess,
        MandateAdditionalTermActions.updateMandateAdditionalTermSuccess,
        MandateAdditionalTermActions.deleteMandateAdditionalTermSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const mandateId =
          'mandate' in action ? action.mandate.mandateId : action.mandateId;
        console.log('[RefreshList] extracted mandateId →', mandateId);
        return mandateId;
      }),

      // only continue if it’s a number
      filter(
        (mandateId): mandateId is number => typeof mandateId === 'number'
      ),

      map((mandateId) =>
        MandateAdditionalTermActions.loadMandateAdditionalTermsByClientId({
          mandateId,
        })
      )
    )
  );

  /**
   * The “by‐mandateId” loader
   */
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateAdditionalTermActions.loadMandateAdditionalTermsByClientId),

      tap((action) =>
        console.log('[Effect:loadByClientId] full action →', action)
      ),
      tap(({ mandateId }) =>
        console.log('[Effect:loadByClientId] mandateId →', mandateId)
      ),

      mergeMap(({ mandateId }) =>
        this.service.getByMandateId(mandateId).pipe(
          tap((items) =>
            console.log('[Effect:loadByClientId] response →', items)
          ),
          map((items) =>
            MandateAdditionalTermActions.loadMandateAdditionalTermsByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              MandateAdditionalTermActions.loadMandateAdditionalTermsByClientIdFailure(
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
    private service: MandateAdditionalTermsService
  ) {}
}
