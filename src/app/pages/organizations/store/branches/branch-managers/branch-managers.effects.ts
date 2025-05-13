import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchManagerActions from './branch-managers.actions';
import { BranchManagersService } from './branch-managers.service';
import { ActivatedRoute } from '@angular/router';
import { BranchManager } from './branch-manager.model';

@Injectable()
export class BranchManagersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchManagerActions.loadBranchManagers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            BranchManagerActions.loadBranchManagersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              BranchManagerActions.loadBranchManagersFailure({
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
      ofType(BranchManagerActions.loadBranchManagersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            BranchManagerActions.loadBranchManagersHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              BranchManagerActions.loadBranchManagersHistoryFailure(
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
      ofType(BranchManagerActions.loadBranchManager),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((branch) =>
            BranchManagerActions.loadBranchManagerSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchManagerActions.loadBranchManagerFailure({
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
      ofType(BranchManagerActions.createBranchManager),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((branch) =>
            BranchManagerActions.createBranchManagerSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchManagerActions.createBranchManagerFailure({
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
      ofType(BranchManagerActions.updateBranchManager),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject branchId if missing
            const enriched: BranchManager = {
              ...serverReturned,
              branchId: data.branchId!,
            };
            console.log('[Effect:update] enriched branch →', enriched);
            return BranchManagerActions.updateBranchManagerSuccess(
              { branch: enriched }
            );
          }),
          catchError((error) =>
            of(
              BranchManagerActions.updateBranchManagerFailure({
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
      ofType(BranchManagerActions.deleteBranchManager),
      mergeMap(({ id, branchId }) =>
        this.service.delete(id).pipe(
          map(() =>
            BranchManagerActions.deleteBranchManagerSuccess({
              id,
              branchId,
            })
          ),
          catchError((error) =>
            of(
              BranchManagerActions.deleteBranchManagerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by branchId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BranchManagerActions.createBranchManagerSuccess,
        BranchManagerActions.updateBranchManagerSuccess,
        BranchManagerActions.deleteBranchManagerSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const branchId =
          'branch' in action ? action.branch.branchId : action.branchId;
        console.log('[RefreshList] extracted branchId →', branchId);
        return branchId;
      }),

      // only continue if it’s a number
      filter(
        (branchId): branchId is number => typeof branchId === 'number'
      ),

      map((branchId) =>
        BranchManagerActions.loadBranchManagersByBranchId({
          branchId,
        })
      )
    )
  );

  /**
   * The “by‐branchId” loader
   */
  loadByBranchId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchManagerActions.loadBranchManagersByBranchId),

      tap((action) =>
        console.log('[Effect:loadByBranchId] full action →', action)
      ),
      tap(({ branchId }) =>
        console.log('[Effect:loadByBranchId] branchId →', branchId)
      ),

      mergeMap(({ branchId }) =>
        this.service.getByBranchId(branchId).pipe(
          tap((items) =>
            console.log('[Effect:loadByBranchId] response →', items)
          ),
          map((items) =>
            BranchManagerActions.loadBranchManagersByBranchIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              BranchManagerActions.loadBranchManagersByBranchIdFailure(
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
    private service: BranchManagersService
  ) {}
}
