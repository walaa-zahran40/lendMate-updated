import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AgreementRegistrationActions from './agreement-registrations.actions';
import { AgreementRegistration } from './agreement-registration.model';
import { AgreementRegistrationsService } from './agreement-registrations.service';

@Injectable()
export class AgreementRegistrationsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementRegistrationActions.loadAgreementRegistrations),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AgreementRegistrationActions.loadAgreementRegistrationsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.loadAgreementRegistrationsFailure({
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
      ofType(AgreementRegistrationActions.loadAgreementRegistrationsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AgreementRegistrationActions.loadAgreementRegistrationsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.loadAgreementRegistrationsHistoryFailure(
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
      ofType(AgreementRegistrationActions.loadAgreementRegistration),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            AgreementRegistrationActions.loadAgreementRegistrationSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.loadAgreementRegistrationFailure({
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
      ofType(AgreementRegistrationActions.createAgreementRegistration),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            AgreementRegistrationActions.createAgreementRegistrationSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.createAgreementRegistrationFailure({
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
      ofType(AgreementRegistrationActions.updateAgreementRegistration),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: AgreementRegistration = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return AgreementRegistrationActions.updateAgreementRegistrationSuccess(
              {
                client: enriched,
              }
            );
          }),
          catchError((error) =>
            of(
              AgreementRegistrationActions.updateAgreementRegistrationFailure({
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
      ofType(AgreementRegistrationActions.deleteAgreementRegistration),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            AgreementRegistrationActions.deleteAgreementRegistrationSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.deleteAgreementRegistrationFailure({
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
        AgreementRegistrationActions.createAgreementRegistrationSuccess,
        AgreementRegistrationActions.updateAgreementRegistrationSuccess,
        AgreementRegistrationActions.deleteAgreementRegistrationSuccess
      ),

      map((action) => {
        if ('clientId' in action) {
          // for create/update you returned `{ client: AgreementRegistration }`,
          // so dig into that object’s clientId
          return action.clientId;
        } else {
          // for delete you returned `{ id, clientId }`
          return action.client.clientId;
        }
      }),

      // only continue if it’s a number

      map((clientId) =>
        AgreementRegistrationActions.loadAgreementRegistrationsByClientId({
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
      ofType(AgreementRegistrationActions.loadAgreementRegistrationsByClientId),

      tap((action) =>
        console.log('[Effect:loadByClientId] full action →', action)
      ),
      tap(({ clientId }) =>
        console.log('[Effect:loadByClientId] clientId →', clientId)
      ),

      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          tap((items) =>
            console.log('[Effect:loadByClientId] response →', items)
          ),
          map((items) =>
            AgreementRegistrationActions.loadAgreementRegistrationsByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              AgreementRegistrationActions.loadAgreementRegistrationsByClientIdFailure(
                {
                  error,
                }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: AgreementRegistrationsService
  ) {}
}
