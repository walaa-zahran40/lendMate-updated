import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehicleManufacturersService } from './vehicle-manufacturers.service';
import * as ActionsList from './vehicle-manufacturers.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { VehicleManufacturer } from './vehicle-manufacturer.model';
import { EntityNames } from '../../../../shared/constants/entity-names';

@Injectable()
export class VehicleManufacturersEffects {
  constructor(
    private actions$: Actions,
    private service: VehicleManufacturersService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading vehicleManufacturers', err);
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
        const dto = payload as Omit<VehicleManufacturer, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.VehicleManufacturer,
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
              entity: EntityNames.VehicleManufacturer,
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
      map(() => ActionsList.loadAll({}))
    )
  );
  // Load address type history
  loadVehicleManufacturerHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadVehicleManufacturerHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadVehicleManufacturerHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadVehicleManufacturerHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
