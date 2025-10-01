import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AgreementFileActions from './agreement-files.actions';
import { AgreementFile } from './agreement-file.model';
import { AgreementFilesService } from './agreement-files.service';

@Injectable()
export class AgreementFilesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFileActions.loadAgreementFiles),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AgreementFileActions.loadAgreementFilesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementFileActions.loadAgreementFilesFailure({
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
      ofType(AgreementFileActions.loadAgreementFilesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AgreementFileActions.loadAgreementFilesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(AgreementFileActions.loadAgreementFilesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFileActions.loadAgreementFile),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          // returns { items, totalCount }
          map((resp) =>
            AgreementFileActions.loadAgreementFileSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(AgreementFileActions.loadAgreementFileFailure({ error }))
          )
        )
      )
    )
  );

  loadByAgreementId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFileActions.loadAgreementFilesByAgreementId),
      mergeMap(({ agreementId }) =>
        this.service.getById(agreementId).pipe(
          // returns { items, totalCount }
          map((resp: any) =>
            AgreementFileActions.loadAgreementFilesByAgreementIdSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementFileActions.loadAgreementFilesByAgreementIdFailure({
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
      ofType(AgreementFileActions.createAgreementFile),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            AgreementFileActions.createAgreementFileSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              AgreementFileActions.createAgreementFileFailure({
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
      ofType(AgreementFileActions.updateAgreementFile),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: AgreementFile = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return AgreementFileActions.updateAgreementFileSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              AgreementFileActions.updateAgreementFileFailure({
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
      ofType(AgreementFileActions.deleteAgreementFile),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            AgreementFileActions.deleteAgreementFileSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              AgreementFileActions.deleteAgreementFileFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AgreementFileActions.createAgreementFileSuccess,
        AgreementFileActions.updateAgreementFileSuccess,
        AgreementFileActions.deleteAgreementFileSuccess
      ),

      map((action) => {
        if ('clientId' in action) {
          // for create/update you returned `{ client: AgreementFile }`,
          // so dig into that object’s clientId
          return action.clientId;
        } else {
          // for delete you returned `{ id, clientId }`
          return action.client.clientId;
        }
      }),

      // only continue if it’s a number

      map((clientId) =>
        AgreementFileActions.loadAgreementFilesByClientId({
          clientId,
        })
      )
    )
  );
  /**
   * The “by‐clientId” loader
   */
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFileActions.loadAgreementFilesByClientId),

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
            AgreementFileActions.loadAgreementFilesByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              AgreementFileActions.loadAgreementFilesByClientIdFailure({
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
    private service: AgreementFilesService
  ) {}
}
