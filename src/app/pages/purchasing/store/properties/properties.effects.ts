import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './properties.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { Property } from './property.model';
import { PropertiesService } from './properties.service';

@Injectable()
export class PropertiesEffects {
  constructor(private actions$: Actions, private service: PropertiesService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading properties', err);
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
        const dto = payload as Omit<Property, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Property,
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
              entity: EntityNames.Property,
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
  // refreshList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       ActionsList.createEntitySuccess,
  //       ActionsList.updateEntitySuccess,
  //       ActionsList.deleteEntitySuccess
  //     ),
  //     map(() => ActionsList.loadAll({}))
  //   )
  // );
  // Load address type history
  loadPropertyHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadPropertyHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) => ActionsList.loadPropertyHistorySuccess({ history })),
          catchError((error) =>
            of(ActionsList.loadPropertyHistoryFailure({ error }))
          )
        )
      )
    )
  );
  loadByAssetId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByAssetId),
      tap(({ assetId }) =>
        console.log(
          '🔄 Effect: loadByAssetId action caught for assetId=',
          assetId
        )
      ),
      mergeMap(({ assetId }) =>
        this.service.getByAssetId(assetId).pipe(
          tap((entity) =>
            console.log('🔄 Service.getByAssetId returned:', entity)
          ),
          // Reuse the same reducer branch as loadByIdSuccess to upsert & set loadedId
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => {
            console.error('❌ Service.getByAssetId error:', error);
            return of(ActionsList.loadByAssetIdFailure({ error }));
          })
        )
      )
    )
  );
}
