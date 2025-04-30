import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BranchActions from './branches.actions';
import { BranchesService } from './branches.service';
import { Branch } from './branch.model';
import { loadBranches } from './branches.actions';

@Injectable()
export class BranchesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.loadBranches),
      tap(() => console.log('✨ [Effect] loadBranches caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((items) =>
            console.log('✨ [Effect] service.getAll() returned', items)
          ),
          map((items: Branch[]) =>
            BranchActions.loadBranchesSuccess({ branches: items })
          ),
          catchError((error) =>
            of(BranchActions.loadBranchesFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.loadBranch),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((branch) => BranchActions.loadBranchSuccess({ branch })),
          catchError((error) => of(BranchActions.loadBranchFailure({ error })))
        )
      )
    )
  );
  logLoad$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BranchActions.loadBranches),
        tap(() => console.log('🐛 [Effect] loadBranches action caught'))
      ),
    { dispatch: false }
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.createBranch),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((branch) => BranchActions.createBranchSuccess({ branch })),
          catchError((error) =>
            of(BranchActions.createBranchFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.updateBranch),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((branch) => BranchActions.updateBranchSuccess({ branch })),
          catchError((error) =>
            of(BranchActions.updateBranchFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.deleteBranch),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => BranchActions.deleteBranchSuccess({ id })),
          catchError((error) =>
            of(BranchActions.deleteBranchFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BranchActions.createBranchSuccess,
        BranchActions.updateBranchSuccess,
        BranchActions.deleteBranchSuccess
      ),
      map(() => BranchActions.loadBranches())
    )
  );
  constructor(private actions$: Actions, private service: BranchesService) {}
}
