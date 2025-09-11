import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './purchasing-order-files.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { PurchaseOrderFile } from './purchasing-order-file.model';
import { PurchaseOrderFilesService } from './purchasing-order-files.service';

@Injectable()
export class PurchasingOrderFilesEffects {
  constructor(
    private actions$: Actions,
    private service: PurchaseOrderFilesService
  ) {}
  createBinary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntityBinary),
      switchMap(({ formData }) =>
        this.service.create(formData).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.PurchasingOrderFile,
              operation: 'create',
            }),
          ]),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        )
      )
    )
  );

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

  // assets.effects.ts
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('[PurchasingOrderFilesEffects] loadById', { id })
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log(
              '[PurchasingOrderFilesEffects] service.getById ->',
              entity
            )
          ),
          map((entity) => {
            if (!entity || typeof entity !== 'object' || entity.id == null) {
              console.error(
                '[PurchasingOrderFilesEffects] Invalid entity from service:',
                entity
              );
              throw new Error(
                'Invalid PurchasingOrderFile payload (missing id)'
              );
            }
            return ActionsList.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error('[PurchasingOrderFilesEffects] getById error', error);
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
        const dto = payload as Omit<PurchaseOrderFile, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.PurchasingOrderFile,
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
              entity: EntityNames.PurchasingOrderFile,
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
  loadPurchasingOrderFileHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadPurchasingOrderFileHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadPurchasingOrderFileHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadPurchasingOrderFileHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
