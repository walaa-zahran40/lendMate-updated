import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientContactPersonActions from './client-contact-persons.actions';
import { ClientContactPersonsService } from './client-contact-persons.service';
import { ClientContactPerson } from './client-contact-person.model';

@Injectable()
export class ClientContactPersonsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientContactPersonActions.loadClientContactPersons),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientContactPersonActions.loadClientContactPersonsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.loadClientContactPersonsFailure({
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
      ofType(ClientContactPersonActions.loadClientContactPersonsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientContactPersonActions.loadClientContactPersonsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.loadClientContactPersonsHistoryFailure(
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
      ofType(ClientContactPersonActions.loadClientContactPerson),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientContactPersonActions.loadClientContactPersonSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.loadClientContactPersonFailure({
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
      ofType(ClientContactPersonActions.createClientContactPerson),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientContactPersonActions.createClientContactPersonSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.createClientContactPersonFailure({
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
      ofType(ClientContactPersonActions.updateClientContactPerson),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientContactPerson = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientContactPersonActions.updateClientContactPersonSuccess(
              { client: enriched }
            );
          }),
          catchError((error) =>
            of(
              ClientContactPersonActions.updateClientContactPersonFailure({
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
      ofType(ClientContactPersonActions.deleteClientContactPerson),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientContactPersonActions.deleteClientContactPersonSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.deleteClientContactPersonFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by clientId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientContactPersonActions.createClientContactPersonSuccess,
        ClientContactPersonActions.updateClientContactPersonSuccess,
        ClientContactPersonActions.deleteClientContactPersonSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const clientId =
          'client' in action ? action.client.clientId : action.clientId;
        console.log('[RefreshList] extracted clientId →', clientId);
        return clientId;
      }),

      // only continue if it’s a number
      filter(
        (clientId): clientId is number => typeof clientId === 'number'
      ),

      map((clientId) =>
        ClientContactPersonActions.loadClientContactPersonsByClientId({
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
      ofType(ClientContactPersonActions.loadClientContactPersonsByClientId),

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
            ClientContactPersonActions.loadClientContactPersonsByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              ClientContactPersonActions.loadClientContactPersonsByClientIdFailure(
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
    private service: ClientContactPersonsService
  ) {}
}
