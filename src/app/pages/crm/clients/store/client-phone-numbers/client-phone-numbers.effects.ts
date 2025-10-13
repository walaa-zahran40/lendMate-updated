import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientPhoneNumberActions from './client-phone-numbers.actions';
import { ClientPhoneNumbersService } from './client-phone-numbers.service';
import { ClientPhoneNumber } from './client-phone-number.model';

@Injectable()
export class ClientPhoneNumbersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientPhoneNumberActions.loadClientPhoneNumbersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersFailure({
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
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientPhoneNumberActions.loadClientPhoneNumbersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersHistoryFailure({
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
      ofType(ClientPhoneNumberActions.loadClientPhoneNumber),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientPhoneNumberActions.loadClientPhoneNumberSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumberFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // create$ – enrich with clientId so refresh selector can read it
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientPhoneNumberActions.createClientPhoneNumber),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((server) =>
            ClientPhoneNumberActions.createClientPhoneNumberSuccess({
              client: {
                ...server,
                clientId:
                  data.createClientPhoneNumbers?.[0]?.clientId ?? data.clientId,
              } as ClientPhoneNumber,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.createClientPhoneNumberFailure({ error })
            )
          )
        )
      )
    )
  );

  // update$ – ensure clientId present
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientPhoneNumberActions.updateClientPhoneNumber),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((server) =>
            ClientPhoneNumberActions.updateClientPhoneNumberSuccess({
              client: {
                ...server,
                clientId: (data as any).clientId,
              } as ClientPhoneNumber,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.updateClientPhoneNumberFailure({ error })
            )
          )
        )
      )
    )
  );

  // load by clientId
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbersByClientId),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          map((items) =>
            ClientPhoneNumberActions.loadClientPhoneNumbersByClientIdSuccess({
              clientId,
              items,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersByClientIdFailure({
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
      ofType(ClientPhoneNumberActions.deleteClientPhoneNumber),
      tap(({ id, clientId }) =>
        console.log('[Effect][delete] action →', { id, clientId })
      ),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          tap(() => console.log('[Effect][delete] API OK for id=', id)),
          map(() =>
            ClientPhoneNumberActions.deleteClientPhoneNumberSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) => {
            console.error('[Effect][delete] API ERROR for id=', id, error);
            return of(
              ClientPhoneNumberActions.deleteClientPhoneNumberFailure({ error })
            );
          })
        )
      )
    )
  );

  // refresh after create/update/delete
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientPhoneNumberActions.createClientPhoneNumberSuccess,
        ClientPhoneNumberActions.updateClientPhoneNumberSuccess,
        ClientPhoneNumberActions.deleteClientPhoneNumberSuccess
      ),
      map((action) =>
        'client' in action ? action.client.clientId : action.clientId
      ),
      filter((clientId): clientId is number => typeof clientId === 'number'),
      map((clientId) =>
        ClientPhoneNumberActions.loadClientPhoneNumbersByClientId({ clientId })
      )
    )
  );

  /**
   * The “by‐clientId” loader
   */

  constructor(
    private actions$: Actions,
    private service: ClientPhoneNumbersService
  ) {}
}
