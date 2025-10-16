import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './equipments.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { Equipment } from './equipment.model';
import { EquipmentsService } from './equipments.service';

@Injectable()
export class EquipmentsEffects {
  constructor(private actions$: Actions, private service: EquipmentsService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading equipments', err);
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
        const dto = payload as Omit<Equipment, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Equipment,
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
              entity: EntityNames.Equipment,
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
  loadEquipmentHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadEquipmentHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadEquipmentHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadEquipmentHistoryFailure({ error }))
          )
        )
      )
    )
  );
  loadByAssetId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByAssetId),
      tap(({ assetId }) =>
        console.log('[EquipmentsEffects] loadByAssetId caught', { assetId })
      ),
      mergeMap(({ assetId }) =>
        this.service.getByAssetId(assetId).pipe(
          tap((entity) =>
            console.log(
              '[EquipmentsEffects] service.getByAssetId -> entity',
              entity
            )
          ),
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => {
            console.error('[EquipmentsEffects] getByAssetId error', error);
            return of(ActionsList.loadByAssetIdFailure({ error }));
          })
        )
      )
    )
  );
}
