import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './assets.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { Asset } from './asset.model';
import { AssetsService } from './assets.service';

@Injectable()
export class AssetsEffects {
  constructor(private actions$: Actions, private service: AssetsService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((items) => console.log('✨ Service returned items:', items)),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading assets', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('🔄 Effect: loadById action caught for id=', id)
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) => console.log('🔄 Service.getById returned:', entity)),
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => {
            console.error('❌ Service.getById error:', error);
            return of(ActionsList.loadByIdFailure({ error }));
          })
        )
      )
    )
  );

  loadByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.loadByIdSuccess),
        tap(({ entity }) =>
          console.log(
            '✨ Effect: loadByIdSuccess action caught, entity:',
            entity
          )
        )
      ),
    { dispatch: false }
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      mergeMap(({ payload }) => {
        const dto = payload as Omit<Asset, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Asset,
              operation: 'create',
            }),
          ]),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Asset,
              operation: 'update',
            }),
          ]),
          catchError((error) => of(ActionsList.updateEntityFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((error) => of(ActionsList.deleteEntityFailure({ error })))
        )
      )
    )
  );
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ActionsList.createEntitySuccess,
        ActionsList.updateEntitySuccess,
        ActionsList.deleteEntitySuccess
      ),
      map(() => ActionsList.loadAssetHistory())
    )
  );
  // Load address type history
  loadAssetHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAssetHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) => ActionsList.loadAssetHistorySuccess({ history })),
          catchError((error) =>
            of(ActionsList.loadAssetHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
