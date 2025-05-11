import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchAddressActions from './branch-addresses.actions';
import { BranchAddressesService } from './branch-addresses.service';
import { BranchAddress } from './branch-address.model';

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

  // After any create/update/delete success: reload by branchId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BranchAddressActions.createBranchAddressSuccess,
        BranchAddressActions.updateBranchAddressSuccess,
        BranchAddressActions.deleteBranchAddressSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const branchId = 'branch' in action ? action.branch : action.branchId;
        console.log('[RefreshList] extracted branchId →', branchId);
        return branchId;
      }),

      // only continue if it’s a number
      filter((branchId): branchId is number => typeof branchId === 'number'),

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
