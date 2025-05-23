import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientStatusActions from './client-statuses.actions';
import { ClientStatusesService } from './client-statuses.service';

@Injectable()
export class ClientStatusesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.loadClientStatuses),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientStatusActions.loadClientStatusesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(ClientStatusActions.loadClientStatusesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.loadClientStatusesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientStatusActions.loadClientStatusesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(ClientStatusActions.loadClientStatusesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.loadClientStatus),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((clientStatus) =>
            ClientStatusActions.loadClientStatusSuccess({ clientStatus })
          ),
          catchError((error) =>
            of(ClientStatusActions.loadClientStatusFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.createClientStatus),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((clientStatus) =>
            ClientStatusActions.createClientStatusSuccess({ clientStatus })
          ),
          catchError((error) =>
            of(ClientStatusActions.createClientStatusFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.updateClientStatus),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((clientStatus) =>
            ClientStatusActions.updateClientStatusSuccess({ clientStatus })
          ),
          catchError((error) =>
            of(ClientStatusActions.updateClientStatusFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientStatusActions.deleteClientStatus),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ClientStatusActions.deleteClientStatusSuccess({ id })),
          catchError((error) =>
            of(ClientStatusActions.deleteClientStatusFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientStatusActions.createClientStatusSuccess,
        ClientStatusActions.updateClientStatusSuccess,
        ClientStatusActions.deleteClientStatusSuccess
      ),
      map(() => ClientStatusActions.loadClientStatuses())
    )
  );
  constructor(
    private actions$: Actions,
    private service: ClientStatusesService
  ) {}
}
