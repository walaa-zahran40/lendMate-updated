import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AgreementOfficerActions from './agreement-officers.actions';
import { AgreementOfficer } from './agreement-officer.model';
import { AgreementOfficersService } from './agreement-officers.service';

@Injectable()
export class AgreementOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementOfficerActions.loadAgreementOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AgreementOfficerActions.loadAgreementOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.loadAgreementOfficersFailure({
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
      ofType(AgreementOfficerActions.loadAgreementOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AgreementOfficerActions.loadAgreementOfficersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.loadAgreementOfficersHistoryFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementOfficerActions.loadAgreementOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((item) =>
            AgreementOfficerActions.loadAgreementOfficerSuccess({
              item,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.loadAgreementOfficerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadByAgreementId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementOfficerActions.loadAgreementOfficersByAgreementId),
      mergeMap(({ agreementId }) =>
        this.service.getByAgreementId(agreementId).pipe(
          tap((resp: any) =>
            console.log(
              '[Effect] API resp length=',
              Array.isArray(resp) ? resp.length : resp?.items?.length
            )
          ),
          map((resp: any) => {
            const items: AgreementOfficer[] = Array.isArray(resp)
              ? resp
              : resp?.items ?? [];
            const totalCount = Array.isArray(resp)
              ? resp.length
              : resp?.totalCount ?? items.length;
            return AgreementOfficerActions.loadAgreementOfficersByAgreementIdSuccess(
              {
                items,
                totalCount,
              }
            );
          }),
          catchError((error) =>
            of(
              AgreementOfficerActions.loadAgreementOfficersByAgreementIdFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementOfficerActions.createAgreementOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            AgreementOfficerActions.createAgreementOfficerSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.createAgreementOfficerFailure({
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
      ofType(AgreementOfficerActions.updateAgreementOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: AgreementOfficer = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return AgreementOfficerActions.updateAgreementOfficerSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              AgreementOfficerActions.updateAgreementOfficerFailure({
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
      ofType(AgreementOfficerActions.deleteAgreementOfficer),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            AgreementOfficerActions.deleteAgreementOfficerSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.deleteAgreementOfficerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementOfficerActions.loadAgreementOfficersByClientId),

      tap((action) =>
        console.log('[Effect:loadByClientId] full action →', action)
      ),
      tap(({ clientId }) =>
        console.log('[Effect:loadByClientId] clientId →', clientId)
      ),

      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId!).pipe(
          tap((items) =>
            console.log('[Effect:loadByClientId] response →', items)
          ),
          map((items) =>
            AgreementOfficerActions.loadAgreementOfficersByClientIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              AgreementOfficerActions.loadAgreementOfficersByClientIdFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: AgreementOfficersService
  ) {}
}
