import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ActionAuthorizationGroupActions from './action-authorization-groups.actions';
import { ActionAuthorizationGroupsService } from './action-authorization-groups.service';
import { ActionAuthorizationGroup } from './action-authorization-group.model';

@Injectable()
export class ActionAuthorizationGroupsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionAuthorizationGroupActions.loadActionAuthorizationGroups),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ActionAuthorizationGroupActions.loadActionAuthorizationGroupsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.loadActionAuthorizationGroupsFailure({
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
      ofType(ActionAuthorizationGroupActions.loadActionAuthorizationGroupsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ActionAuthorizationGroupActions.loadActionAuthorizationGroupsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.loadActionAuthorizationGroupsHistoryFailure({
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
      ofType(ActionAuthorizationGroupActions.loadActionAuthorizationGroup),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ActionAuthorizationGroupActions.loadActionAuthorizationGroupSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.loadActionAuthorizationGroupFailure({
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
      ofType(ActionAuthorizationGroupActions.createActionAuthorizationGroup),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ActionAuthorizationGroupActions.createActionAuthorizationGroupSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.createActionAuthorizationGroupFailure({
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
      ofType(ActionAuthorizationGroupActions.updateActionAuthorizationGroup),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientStatusActionId if missing
            const enriched: ActionAuthorizationGroup = {
              ...serverReturned,
              clientStatusActionId: data.clientStatusActionId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ActionAuthorizationGroupActions.updateActionAuthorizationGroupSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.updateActionAuthorizationGroupFailure({
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
      ofType(ActionAuthorizationGroupActions.deleteActionAuthorizationGroup),
      mergeMap(({ id, clientStatusActionId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ActionAuthorizationGroupActions.deleteActionAuthorizationGroupSuccess({
              id,
              clientStatusActionId,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.deleteActionAuthorizationGroupFailure({
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
        ActionAuthorizationGroupActions.createActionAuthorizationGroupSuccess,
        ActionAuthorizationGroupActions.updateActionAuthorizationGroupSuccess,
        ActionAuthorizationGroupActions.deleteActionAuthorizationGroupSuccess
      ),

      map((action) => {
        if ('clientStatusActionId' in action) {
          // for create/update you returned `{ client: ActionAuthorizationGroup }`,
          // so dig into that object’s clientStatusActionId
          return action.clientStatusActionId;
        } else {
          // for delete you returned `{ id, clientStatusActionId }`
          return action.client.clientStatusActionId;
        }
      }),

      // only continue if it’s a number

      map((clientStatusActionId) =>
        ActionAuthorizationGroupActions.loadActionAuthorizationGroupsByClientStatusActionId({
          clientStatusActionId,
        })
      )
    )
  );
  /**
   * The “by‐clientStatusActionId” loader
   */
  loadByClientStatusActionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionAuthorizationGroupActions.loadActionAuthorizationGroupsByClientStatusActionId),

      tap((action) =>
        console.log('[Effect:loadByClientStatusActionId] full action →', action)
      ),
      tap(({ clientStatusActionId }) =>
        console.log('[Effect:loadByClientStatusActionId] clientStatusActionId →', clientStatusActionId)
      ),

      mergeMap(({ clientStatusActionId }) =>
        this.service.getByClientStatusActionId(clientStatusActionId).pipe(
          tap((items) =>
            console.log('[Effect:loadByClientStatusActionId] response →', items)
          ),
          map((items) =>
            ActionAuthorizationGroupActions.loadActionAuthorizationGroupsByClientStatusActionIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ActionAuthorizationGroupActions.loadActionAuthorizationGroupsByClientStatusActionIdFailure({
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
    private service: ActionAuthorizationGroupsService
  ) {}
}
