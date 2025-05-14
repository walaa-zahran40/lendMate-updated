import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchAddressActions from './role-claims.actions';
import { BranchAddressesService } from './role-claims.service';
import { BranchAddress } from './role-claim.model';

@Injectable()
export class BranchAddressesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchAddressActions.loadBranchAddresses),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            BranchAddressActions.loadBranchAddressesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.loadBranchAddressesFailure({
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
      ofType(BranchAddressActions.loadBranchAddressesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            BranchAddressActions.loadBranchAddressesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.loadBranchAddressesHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchAddressActions.loadBranchAddress),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((branch) =>
            BranchAddressActions.loadBranchAddressSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.loadBranchAddressFailure({
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
      ofType(BranchAddressActions.createBranchAddress),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((branch) =>
            BranchAddressActions.createBranchAddressSuccess({
              branch,
            })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.createBranchAddressFailure({
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
      ofType(BranchAddressActions.updateBranchAddress),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject branchId if missing
            const enriched: BranchAddress = {
              ...serverReturned,
              branchId: data.branchId!,
            };
            console.log('[Effect:update] enriched branch →', enriched);
            return BranchAddressActions.updateBranchAddressSuccess({
              branch: enriched,
            });
          }),
          catchError((error) =>
            of(
              BranchAddressActions.updateBranchAddressFailure({
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
      ofType(BranchAddressActions.deleteBranchAddress),
      mergeMap(({ id, branchId }) =>
        this.service.delete(id).pipe(
          map(() =>
            BranchAddressActions.deleteBranchAddressSuccess({
              id,
              branchId,
            })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.deleteBranchAddressFailure({
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
        BranchAddressActions.createBranchAddressSuccess,
        BranchAddressActions.updateBranchAddressSuccess,
        BranchAddressActions.deleteBranchAddressSuccess
      ),

      map((action) => {
        if ('branchId' in action) {
          // for create/update you returned `{ branch: BranchAddress }`,
          // so dig into that object’s branchId
          return action.branchId;
        } else {
          // for delete you returned `{ id, branchId }`
          return action.branch.branchId;
        }
      }),

      // only continue if it’s a number

      map((branchId) =>
        BranchAddressActions.loadBranchAddressesByBranchId({
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
      ofType(BranchAddressActions.loadBranchAddressesByBranchId),

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
            BranchAddressActions.loadBranchAddressesByBranchIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              BranchAddressActions.loadBranchAddressesByBranchIdFailure({
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
    private service: BranchAddressesService
  ) {}
}
