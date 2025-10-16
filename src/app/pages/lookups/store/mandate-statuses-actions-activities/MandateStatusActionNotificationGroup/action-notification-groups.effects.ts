import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  tap,
  filter,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as MandateActionNotificationGroupActions from './action-notification-groups.actions';
import { MandateActionNotificationGroupsService } from './action-notification-groups.service';
import { MandateActionNotificationGroup } from './action-notification-group.model';

@Injectable()
export class MandateActionNotificationGroupsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroups
      ),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsSuccess(
              {
                items: resp.items,
                totalCount: resp.totalCount,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsFailure(
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

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsHistory
      ),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsHistoryFailure(
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

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroup
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((mandate) =>
            MandateActionNotificationGroupActions.loadMandateActionNotificationGroupSuccess(
              {
                mandate,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.loadMandateActionNotificationGroupFailure(
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
      ofType(
        MandateActionNotificationGroupActions.createMandateActionNotificationGroup
      ),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((mandate) =>
            MandateActionNotificationGroupActions.createMandateActionNotificationGroupSuccess(
              {
                mandate,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.createMandateActionNotificationGroupFailure(
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
      ofType(
        MandateActionNotificationGroupActions.updateMandateActionNotificationGroup
      ),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject mandateStatusActionId if missing
            const enriched: MandateActionNotificationGroup = {
              ...serverReturned,
              mandateStatusActionId: data.mandateStatusActionId!,
            };
            console.log('[Effect:update] enriched mandate →', enriched);
            return MandateActionNotificationGroupActions.updateMandateActionNotificationGroupSuccess(
              {
                mandate: enriched,
              }
            );
          }),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.updateMandateActionNotificationGroupFailure(
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
      ofType(
        MandateActionNotificationGroupActions.deleteMandateActionNotificationGroup
      ),
      mergeMap(({ id, mandateStatusActionId }) =>
        this.service.delete(id).pipe(
          map(() =>
            MandateActionNotificationGroupActions.deleteMandateActionNotificationGroupSuccess(
              {
                id,
                mandateStatusActionId,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.deleteMandateActionNotificationGroupFailure(
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
        MandateActionNotificationGroupActions.createMandateActionNotificationGroupSuccess,
        MandateActionNotificationGroupActions.updateMandateActionNotificationGroupSuccess,
        MandateActionNotificationGroupActions.deleteMandateActionNotificationGroupSuccess
      ),

      map((action) => {
        if ('mandateStatusActionId' in action) {
          // for create/update you returned `{ mandate: ActionNotificationGroup }`,
          // so dig into that object’s mandateStatusActionId
          return action.mandateStatusActionId;
        } else {
          // for delete you returned `{ id, mandateStatusActionId }`
          return action.mandate.mandateStatusActionId;
        }
      }),

      // only continue if it’s a number

      map((mandateStatusActionId) =>
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsByMandateStatusActionId(
          {
            mandateStatusActionId,
          }
        )
      )
    )
  );
  /**
   * The “by‐mandateStatusActionId” loader
   */
  loadByMandateStatusActionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsByMandateStatusActionId
      ),

      tap((action) =>
        console.log(
          '[Effect:loadByMandateStatusActionId] full action →',
          action
        )
      ),
      tap(({ mandateStatusActionId }) =>
        console.log(
          '[Effect:loadByMandateStatusActionId] mandateStatusActionId →',
          mandateStatusActionId
        )
      ),

      mergeMap(({ mandateStatusActionId }) =>
        this.service.getByMandateStatusActionId(mandateStatusActionId).pipe(
          tap((items) =>
            console.log(
              '[Effect:loadByMandateStatusActionId] response →',
              items
            )
          ),
          map((items) =>
            MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsByMandateStatusActionIdSuccess(
              {
                items,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.loadMandateActionNotificationGroupsByMandateStatusActionIdFailure(
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
  loadMandateActionNotificationGroupHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionNotificationGroupActions.loadMandateActionNotificationGroupHistory
      ),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            MandateActionNotificationGroupActions.loadMandateActionNotificationGroupHistorySuccess(
              {
                history,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionNotificationGroupActions.loadMandateActionNotificationGroupHistoryFailure(
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
    private service: MandateActionNotificationGroupsService
  ) {}
}
