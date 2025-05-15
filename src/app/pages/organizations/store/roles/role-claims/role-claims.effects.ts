import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RoleClaimActions from './role-claims.actions';
import { RoleClaimsService } from './role-claims.service';
import { RoleClaim } from './role-claim.model';

@Injectable()
export class RoleClaimsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleClaimActions.loadRoleClaims),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            RoleClaimActions.loadRoleClaimsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              RoleClaimActions.loadRoleClaimsFailure({
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
      ofType(RoleClaimActions.loadRoleClaimsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            RoleClaimActions.loadRoleClaimsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(RoleClaimActions.loadRoleClaimsHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleClaimActions.loadRoleClaim),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((role) =>
            RoleClaimActions.loadRoleClaimSuccess({
              role,
            })
          ),
          catchError((error) =>
            of(
              RoleClaimActions.loadRoleClaimFailure({
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
      ofType(RoleClaimActions.createRoleClaim),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((role) =>
            RoleClaimActions.createRoleClaimSuccess({
              role,
            })
          ),
          catchError((error) =>
            of(
              RoleClaimActions.createRoleClaimFailure({
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
      ofType(RoleClaimActions.updateRoleClaim),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject roleId if missing
            const enriched: RoleClaim = {
              ...serverReturned,
              roleId: data.roleId!,
            };
            console.log('[Effect:update] enriched role →', enriched);
            return RoleClaimActions.updateRoleClaimSuccess({
              role: enriched,
            });
          }),
          catchError((error) =>
            of(
              RoleClaimActions.updateRoleClaimFailure({
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
      ofType(RoleClaimActions.deleteRoleClaim),
      mergeMap(({ id, roleId }) =>
        this.service.delete(id).pipe(
          map(() =>
            RoleClaimActions.deleteRoleClaimSuccess({
              id,
              roleId,
            })
          ),
          catchError((error) =>
            of(
              RoleClaimActions.deleteRoleClaimFailure({
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
        RoleClaimActions.createRoleClaimSuccess,
        RoleClaimActions.updateRoleClaimSuccess,
        RoleClaimActions.deleteRoleClaimSuccess
      ),

      map((action) => {
        if ('roleId' in action) {
          // for create/update you returned `{ role: RoleClaim }`,
          // so dig into that object’s roleId
          return action.roleId;
        } else {
          // for delete you returned `{ id, roleId }`
          return action.role.roleId;
        }
      }),

      // only continue if it’s a number

      map((roleId) =>
        RoleClaimActions.loadRoleClaimsByRoleId({
          roleId,
        })
      )
    )
  );
  /**
   * The “by‐roleId” loader
   */
  loadByRoleId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleClaimActions.loadRoleClaimsByRoleId),

      tap((action) =>
        console.log('[Effect:loadByRoleId] full action →', action)
      ),
      tap(({ roleId }) =>
        console.log('[Effect:loadByRoleId] roleId →', roleId)
      ),

      mergeMap(({ roleId }) =>
        this.service.getByRoleId(roleId).pipe(
          tap((items) =>
            console.log('[Effect:loadByRoleId] response →', items)
          ),
          map((items) =>
            RoleClaimActions.loadRoleClaimsByRoleIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              RoleClaimActions.loadRoleClaimsByRoleIdFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: RoleClaimsService) {}
}
