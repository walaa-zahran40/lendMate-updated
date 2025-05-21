import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientFileActions from './client-files.actions';
import { ClientFile } from './client-file.model';
import { ClientFilesService } from './client-files.service';

@Injectable()
export class ClientFilesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFiles),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientFileActions.loadClientFilesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientFileActions.loadClientFilesFailure({
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
      ofType(ClientFileActions.loadClientFilesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientFileActions.loadClientFilesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(ClientFileActions.loadClientFilesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFile),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientFileActions.loadClientFileSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientFileActions.loadClientFileFailure({
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
      ofType(ClientFileActions.createClientFile),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientFileActions.createClientFileSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientFileActions.createClientFileFailure({
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
      ofType(ClientFileActions.updateClientFile),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientFile = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientFileActions.updateClientFileSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientFileActions.updateClientFileFailure({
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
      ofType(ClientFileActions.deleteClientFile),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientFileActions.deleteClientFileSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientFileActions.deleteClientFileFailure({
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
        ClientFileActions.createClientFileSuccess,
        ClientFileActions.updateClientFileSuccess,
        ClientFileActions.deleteClientFileSuccess
      ),

      map((action) => {
        if ('client' in action && action.client) {
          // for create/update you returned `{ client: ClientFile }`,
          // so dig into that object’s clientId
          return action.client.clientId;
        } else if ('clientId' in action) {
          // for delete you returned `{ id, clientId }`
          return action.clientId;
        }
        return undefined;
      }),

      filter((clientId): clientId is number => typeof clientId === 'number'),

      map((clientId) =>
        ClientFileActions.loadClientFilesByClientId({
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
      ofType(ClientFileActions.loadClientFilesByClientId),
      tap((a) => console.log('[Effect] got action →', a)),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          tap((resp) => console.log('[Effect] getByClientId response →', resp)),
          // DESCTRUCTURE here:
          map((files: ClientFile[]) =>
            ClientFileActions.loadClientFilesByClientIdSuccess({ files })
          ),
          catchError((error) => {
            console.error('[Effect] getByClientId error →', error);
            return of(
              ClientFileActions.loadClientFilesByClientIdFailure({ error })
            );
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: ClientFilesService) {}
}
