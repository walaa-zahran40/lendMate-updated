import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './purchasing-orders.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { PurchaseOrder } from './purchasing-order.model';
import { PurchasingOrdersService } from './purchasing-orders.service';

@Injectable()
export class PurchasingOrdersEffects {
  constructor(
    private actions$: Actions,
    private service: PurchasingOrdersService
  ) {}

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
        console.log('[PurchasingOrdersEffects] loadById', { id })
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[PurchasingOrdersEffects] service.getById ->', entity)
          ),
          map((entity) => {
            if (!entity || typeof entity !== 'object' || entity.id == null) {
              console.error(
                '[PurchasingOrdersEffects] Invalid entity from service:',
                entity
              );
              throw new Error('Invalid PurchasingOrder payload (missing id)');
            }
            return ActionsList.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error('[PurchasingOrdersEffects] getById error', error);
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
        const dto = payload as Omit<PurchaseOrder, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.PurchasingOrder,
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
              entity: EntityNames.PurchasingOrder,
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
  loadPurchasingOrderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadPurchasingOrderHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadPurchasingOrderHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadPurchasingOrderHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
