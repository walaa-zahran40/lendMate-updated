import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './vehicles.actions';
import * as AssetsActions from '../assets/assets.actions';

import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { Vehicle } from './vehicle.model';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class VehiclesEffects {
  constructor(private actions$: Actions, private service: VehiclesService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((items) => console.log('✨ Service returned items:', items)),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading vehicles', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadByAssetId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('🔄 Effect: loadById action caught for id=', id)
      ),
      mergeMap(({ id }) =>
        this.service.getByAssetId(id).pipe(
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
        const dto = payload as Omit<Vehicle, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Vehicle,
              operation: 'create',
            }),
          ]),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        );
      })
    )
  );
  // After vehicle creation, refresh assets list
  createSuccessRefreshAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntitySuccess),
      map(() => AssetsActions.loadAll({})) // <— see next snippet
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
              entity: EntityNames.Vehicle,
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
  //     map(() => ActionsList.loadVehicleHistory())
  //   )
  // );
  // Load address type history
  loadVehicleHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadVehicleHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) => ActionsList.loadVehicleHistorySuccess({ history })),
          catchError((error) =>
            of(ActionsList.loadVehicleHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
