import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AgreementContactPersonActions from './agreement-contact-persons.actions';
import { AgreementContactPerson } from './agreement-contact-person.model';
import { AgreementContactPersonsService } from './agreement-contact-persons.service';

@Injectable()
export class AgreementContactPersonsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementContactPersonActions.loadAgreementContactPersons),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AgreementContactPersonActions.loadAgreementContactPersonsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.loadAgreementContactPersonsFailure({
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
      ofType(AgreementContactPersonActions.loadAgreementContactPersonsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AgreementContactPersonActions.loadAgreementContactPersonsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.loadAgreementContactPersonsHistoryFailure(
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
      ofType(AgreementContactPersonActions.loadAgreementContactPerson),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          // returns { items, totalCount }
          map((resp) =>
            AgreementContactPersonActions.loadAgreementContactPersonSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.loadAgreementContactPersonFailure({
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
      ofType(
        AgreementContactPersonActions.loadAgreementContactPersonsByAgreementId
      ),
      mergeMap(({ agreementId }) =>
        this.service.getById(agreementId).pipe(
          // returns { items, totalCount }
          map((resp: any) =>
            AgreementContactPersonActions.loadAgreementContactPersonsByAgreementIdSuccess(
              {
                items: resp.items,
                totalCount: resp.totalCount,
              }
            )
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.loadAgreementContactPersonsByAgreementIdFailure(
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

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementContactPersonActions.createAgreementContactPerson),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            AgreementContactPersonActions.createAgreementContactPersonSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.createAgreementContactPersonFailure(
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

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementContactPersonActions.updateAgreementContactPerson),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: AgreementContactPerson = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return AgreementContactPersonActions.updateAgreementContactPersonSuccess(
              {
                client: enriched,
              }
            );
          }),
          catchError((error) =>
            of(
              AgreementContactPersonActions.updateAgreementContactPersonFailure(
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

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementContactPersonActions.deleteAgreementContactPerson),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            AgreementContactPersonActions.deleteAgreementContactPersonSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.deleteAgreementContactPersonFailure(
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

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AgreementContactPersonActions.createAgreementContactPersonSuccess,
        AgreementContactPersonActions.updateAgreementContactPersonSuccess,
        AgreementContactPersonActions.deleteAgreementContactPersonSuccess
      ),

      map((action) => {
        if ('clientId' in action) {
          // for create/update you returned `{ client: AgreementContactPerson }`,
          // so dig into that object’s clientId
          return action.clientId;
        } else {
          // for delete you returned `{ id, clientId }`
          return action.client.clientId;
        }
      }),

      // only continue if it’s a number

      map((clientId) =>
        AgreementContactPersonActions.loadAgreementContactPersonsByClientId({
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
      ofType(
        AgreementContactPersonActions.loadAgreementContactPersonsByClientId
      ),

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
            AgreementContactPersonActions.loadAgreementContactPersonsByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              AgreementContactPersonActions.loadAgreementContactPersonsByClientIdFailure(
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
    private service: AgreementContactPersonsService
  ) {}
}
