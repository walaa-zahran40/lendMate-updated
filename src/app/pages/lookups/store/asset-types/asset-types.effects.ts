import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AssetTypeActions from './asset-types.actions';
import { AssetTypesService } from './asset-types.service';

@Injectable()
export class AssetTypesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.loadAssetTypes),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            AssetTypeActions.loadAssetTypesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(AssetTypeActions.loadAssetTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.loadAssetTypesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            AssetTypeActions.loadAssetTypesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(AssetTypeActions.loadAssetTypesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.loadAssetType),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((currency) =>
            AssetTypeActions.loadAssetTypeSuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeActions.loadAssetTypeFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.createAssetType),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((currency) =>
            AssetTypeActions.createAssetTypeSuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeActions.createAssetTypeFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.updateAssetType),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((currency) =>
            AssetTypeActions.updateAssetTypeSuccess({ currency })
          ),
          catchError((error) =>
            of(AssetTypeActions.updateAssetTypeFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetTypeActions.deleteAssetType),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => AssetTypeActions.deleteAssetTypeSuccess({ id })),
          catchError((error) =>
            of(AssetTypeActions.deleteAssetTypeFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AssetTypeActions.createAssetTypeSuccess,
        AssetTypeActions.updateAssetTypeSuccess,
        AssetTypeActions.deleteAssetTypeSuccess
      ),
      map(() => AssetTypeActions.loadAssetTypes())
    )
  );
  constructor(
    private actions$: Actions,
    private service: AssetTypesService
  ) {}
}
