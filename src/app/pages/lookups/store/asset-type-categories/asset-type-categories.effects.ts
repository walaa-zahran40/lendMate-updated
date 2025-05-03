import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AssetTypeCategoryActions from './asset-type-categories.actions';
import { AssetTypeCategoriesService } from './asset-type-categories.service';

@Injectable()
export class AssetTypeCategoriesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.loadAssetTypeCategories),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AssetTypeCategoryActions.loadAssetTypeCategoriesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(AssetTypeCategoryActions.loadAssetTypeCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.loadAssetTypeCategoriesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AssetTypeCategoryActions.loadAssetTypeCategoriesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(AssetTypeCategoryActions.loadAssetTypeCategoriesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.loadAssetTypeCategory),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((currency) =>
            AssetTypeCategoryActions.loadAssetTypeCategorySuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeCategoryActions.loadAssetTypeCategoryFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.createAssetTypeCategory),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((currency) =>
            AssetTypeCategoryActions.createAssetTypeCategorySuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeCategoryActions.createAssetTypeCategoryFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.updateAssetTypeCategory),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((currency) =>
            AssetTypeCategoryActions.updateAssetTypeCategorySuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeCategoryActions.updateAssetTypeCategoryFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeCategoryActions.deleteAssetTypeCategory),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => AssetTypeCategoryActions.deleteAssetTypeCategorySuccess({ id })),
          catchError((error) =>
            of(AssetTypeCategoryActions.deleteAssetTypeCategoryFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AssetTypeCategoryActions.createAssetTypeCategorySuccess,
        AssetTypeCategoryActions.updateAssetTypeCategorySuccess,
        AssetTypeCategoryActions.deleteAssetTypeCategorySuccess
      ),
      map(() => AssetTypeCategoryActions.loadAssetTypeCategories())
    )
  );
  constructor(
    private actions$: Actions,
    private service: AssetTypeCategoriesService
  ) {}
}
