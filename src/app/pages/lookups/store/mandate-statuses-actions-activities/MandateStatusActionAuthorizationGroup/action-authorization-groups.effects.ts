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
import * as MandateActionAuthorizationGroupActions from './action-authorization-groups.actions';
import { MandateActionAuthorizationGroupsService } from './action-authorization-groups.service';
import { MandateActionAuthorizationGroup } from './action-authorization-group.model';

@Injectable()
export class MandateActionAuthorizationGroupsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroups
      ),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsSuccess(
              {
                items: resp.items,
                totalCount: resp.totalCount,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsFailure(
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
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsHistory
      ),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsHistoryFailure(
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
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroup
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((mandate) =>
            MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupSuccess(
              {
                mandate,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupFailure(
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
        MandateActionAuthorizationGroupActions.createMandateActionAuthorizationGroup
      ),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((mandate) =>
            MandateActionAuthorizationGroupActions.createMandateActionAuthorizationGroupSuccess(
              {
                mandate,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.createMandateActionAuthorizationGroupFailure(
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
        MandateActionAuthorizationGroupActions.updateMandateActionAuthorizationGroup
      ),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject mandateStatusActionId if missing
            const enriched: MandateActionAuthorizationGroup = {
              ...serverReturned,
              mandateStatusActionId: data.mandateStatusActionId!,
            };
            console.log('[Effect:update] enriched mandate →', enriched);
            return MandateActionAuthorizationGroupActions.updateMandateActionAuthorizationGroupSuccess(
              {
                mandate: enriched,
              }
            );
          }),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.updateMandateActionAuthorizationGroupFailure(
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
        MandateActionAuthorizationGroupActions.deleteMandateActionAuthorizationGroup
      ),
      mergeMap(({ id, mandateStatusActionId }) =>
        this.service.delete(id).pipe(
          map(() =>
            MandateActionAuthorizationGroupActions.deleteMandateActionAuthorizationGroupSuccess(
              {
                id,
                mandateStatusActionId,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.deleteMandateActionAuthorizationGroupFailure(
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
        MandateActionAuthorizationGroupActions.createMandateActionAuthorizationGroupSuccess,
        MandateActionAuthorizationGroupActions.updateMandateActionAuthorizationGroupSuccess,
        MandateActionAuthorizationGroupActions.deleteMandateActionAuthorizationGroupSuccess
      ),

      map((action) => {
        if ('mandateStatusActionId' in action) {
          // for create/update you returned `{ mandate: ActionAuthorizationGroup }`,
          // so dig into that object’s mandateStatusActionId
          return action.mandateStatusActionId;
        } else {
          // for delete you returned `{ id, mandateStatusActionId }`
          return action.mandate.mandateStatusActionId;
        }
      }),

      // only continue if it’s a number

      map((mandateStatusActionId) =>
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsByMandateStatusActionId(
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
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsByMandateStatusActionId
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
            MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsByMandateStatusActionIdSuccess(
              {
                items,
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupsByMandateStatusActionIdFailure(
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

  loadMandateActionAuthorizationGroupHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupHistory
      ),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupHistorySuccess(
              {
                history: history.map((item: any) => ({
                  ...item,
                  mandateStatusActionId: item.mandateStatusActionId ?? null,
                  mandateStatusAction: item.mandateStatusAction ?? null,
                })),
              }
            )
          ),
          catchError((error) =>
            of(
              MandateActionAuthorizationGroupActions.loadMandateActionAuthorizationGroupHistoryFailure(
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
    private service: MandateActionAuthorizationGroupsService
  ) {}
}
