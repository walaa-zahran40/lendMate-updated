import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchOfficerActions from './branch-officers.actions';
import { BranchOfficersService } from './branch-officers.service';
import { ActivatedRoute } from '@angular/router';
import { BranchOfficer } from './branch-officer.model';

@Injectable()
export class BranchOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchOfficerActions.loadBranchOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            BranchOfficerActions.loadBranchOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.loadBranchOfficersFailure({
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
      ofType(BranchOfficerActions.loadBranchOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            BranchOfficerActions.loadBranchOfficersHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.loadBranchOfficersHistoryFailure(
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
      ofType(BranchOfficerActions.loadBranchOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((branch) =>
            BranchOfficerActions.loadBranchOfficerSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.loadBranchOfficerFailure({
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
      ofType(BranchOfficerActions.createBranchOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((branch) =>
            BranchOfficerActions.createBranchOfficerSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.createBranchOfficerFailure({
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
      ofType(BranchOfficerActions.updateBranchOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject branchId if missing
            const enriched: BranchOfficer = {
              ...serverReturned,
              branchId: data.branchId!,
            };
            console.log('[Effect:update] enriched branch →', enriched);
            return BranchOfficerActions.updateBranchOfficerSuccess(
              { branch: enriched }
            );
          }),
          catchError((error) =>
            of(
              BranchOfficerActions.updateBranchOfficerFailure({
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
      ofType(BranchOfficerActions.deleteBranchOfficer),
      mergeMap(({ id, branchId }) =>
        this.service.delete(id).pipe(
          map(() =>
            BranchOfficerActions.deleteBranchOfficerSuccess({
              id,
              branchId,
            })
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.deleteBranchOfficerFailure({
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
        BranchOfficerActions.createBranchOfficerSuccess,
        BranchOfficerActions.updateBranchOfficerSuccess,
        BranchOfficerActions.deleteBranchOfficerSuccess
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
        BranchOfficerActions.loadBranchOfficersByBranchId({
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
      ofType(BranchOfficerActions.loadBranchOfficersByBranchId),

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
            BranchOfficerActions.loadBranchOfficersByBranchIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              BranchOfficerActions.loadBranchOfficersByBranchIdFailure(
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
    private service: BranchOfficersService
  ) {}
}
