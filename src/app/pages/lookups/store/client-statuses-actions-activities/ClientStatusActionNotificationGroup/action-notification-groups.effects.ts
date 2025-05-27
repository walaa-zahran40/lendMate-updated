import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ActionNotificationGroupActions from './action-notification-groups.actions';
import { ActionNotificationGroupsService } from './action-notification-groups.service';
import { ActionNotificationGroup } from './action-notification-group.model';

@Injectable()
export class ActionNotificationGroupsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNotificationGroupActions.loadActionNotificationGroups),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ActionNotificationGroupActions.loadActionNotificationGroupsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.loadActionNotificationGroupsFailure({
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
      ofType(ActionNotificationGroupActions.loadActionNotificationGroupsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ActionNotificationGroupActions.loadActionNotificationGroupsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.loadActionNotificationGroupsHistoryFailure({
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
      ofType(ActionNotificationGroupActions.loadActionNotificationGroup),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ActionNotificationGroupActions.loadActionNotificationGroupSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.loadActionNotificationGroupFailure({
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
      ofType(ActionNotificationGroupActions.createActionNotificationGroup),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ActionNotificationGroupActions.createActionNotificationGroupSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.createActionNotificationGroupFailure({
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
      ofType(ActionNotificationGroupActions.updateActionNotificationGroup),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientStatusActionId if missing
            const enriched: ActionNotificationGroup = {
              ...serverReturned,
              clientStatusActionId: data.clientStatusActionId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ActionNotificationGroupActions.updateActionNotificationGroupSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.updateActionNotificationGroupFailure({
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
      ofType(ActionNotificationGroupActions.deleteActionNotificationGroup),
      mergeMap(({ id, clientStatusActionId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ActionNotificationGroupActions.deleteActionNotificationGroupSuccess({
              id,
              clientStatusActionId,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.deleteActionNotificationGroupFailure({
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
        ActionNotificationGroupActions.createActionNotificationGroupSuccess,
        ActionNotificationGroupActions.updateActionNotificationGroupSuccess,
        ActionNotificationGroupActions.deleteActionNotificationGroupSuccess
      ),

      map((action) => {
        if ('clientStatusActionId' in action) {
          // for create/update you returned `{ client: ActionNotificationGroup }`,
          // so dig into that object’s clientStatusActionId
          return action.clientStatusActionId;
        } else {
          // for delete you returned `{ id, clientStatusActionId }`
          return action.client.clientStatusActionId;
        }
      }),

      // only continue if it’s a number

      map((clientStatusActionId) =>
        ActionNotificationGroupActions.loadActionNotificationGroupsByClientStatusActionId({
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
      ofType(ActionNotificationGroupActions.loadActionNotificationGroupsByClientStatusActionId),

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
            ActionNotificationGroupActions.loadActionNotificationGroupsByClientStatusActionIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ActionNotificationGroupActions.loadActionNotificationGroupsByClientStatusActionIdFailure({
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
    private service: ActionNotificationGroupsService
  ) {}
}
