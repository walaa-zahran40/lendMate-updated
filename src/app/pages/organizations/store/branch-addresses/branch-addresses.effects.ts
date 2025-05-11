import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchAddressActions from './branch-addresses.actions';
import { BranchAddressesService } from './branch-addresses.service';

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
            of(BranchAddressActions.loadBranchAddressesFailure({ error }))
          )
        )
      )
    )
  );
  loadAllByBranchId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchAddressActions.loadBranchAddressesByBranchId),

      tap((action) =>
        console.log('[Effect:loadAllByBranchId] full action →', action)
      ),
      tap(({ branchId }) =>
        console.log('[Effect:loadAllByBranchId] currencyId →', branchId)
      ),

      mergeMap(({ branchId }) =>
        this.service.getAllByBranchId(branchId).pipe(
          tap((items) =>
            console.log('[Effect:loadAllByBranchId] response →', items)
          ),
          map((items) =>
            BranchAddressActions.loadBranchAddressesByBranchIdSuccess(
              {items }
            )
          ),
          catchError((error) =>
            of(
              BranchAddressActions.loadBranchAddressesByBranchIdFailure(
                { error }
              )
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
            of(BranchAddressActions.loadBranchAddressesHistoryFailure({ error }))
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
          map((branchAddress) =>
            BranchAddressActions.loadBranchAddressSuccess({ branchAddress })
          ),
          catchError((error) =>
            of(BranchAddressActions.loadBranchAddressFailure({ error }))
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
          map((branchAddress) =>
            BranchAddressActions.createBranchAddressSuccess({ branchAddress })
          ),
          catchError((error) =>
            of(BranchAddressActions.createBranchAddressFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchAddressActions.updateBranchAddress),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((branchAddress) =>
            BranchAddressActions.updateBranchAddressSuccess({ branchAddress })
          ),
          catchError((error) =>
            of(BranchAddressActions.updateBranchAddressFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchAddressActions.deleteBranchAddress),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => BranchAddressActions.deleteBranchAddressSuccess({ id })),
          catchError((error) =>
            of(BranchAddressActions.deleteBranchAddressFailure({ error }))
          )
        )
      )
    )
  );

  // refreshList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       BranchAddressActions.createBranchAddressSuccess,
  //       BranchAddressActions.updateBranchAddressSuccess,
  //       BranchAddressActions.deleteBranchAddressSuccess
  //     ),
  //     map(() => BranchAddressActions.loadBranchAddresses())
  //   )
  // );


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
          const branchId =
            'branch' in action ? action.branch. : action.branchId;
          console.log('[RefreshList] extracted branchId →', branchId);
          return branchId;
        }),
  
        // only continue if it’s a number
        filter(
          (branchId): branchId is number => typeof branchId === 'number'
        ),
  
        map((branchId) =>
          BranchAddressActions.loadBranchAddressesByBranchId({
            branchId,
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private service: BranchAddressesService
  ) {}
}
