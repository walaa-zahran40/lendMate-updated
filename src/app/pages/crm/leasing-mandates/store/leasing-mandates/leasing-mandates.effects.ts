import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandatesService } from './leasing-mandates.service';
import * as ActionsList from './leasing-mandates.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Mandate } from './leasing-mandate.model';
import { EntityNames } from '../../../../../shared/constants/entity-names';

@Injectable()
export class MandatesEffects {
  constructor(private actions$: Actions, private service: MandatesService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((items) => console.log('✨ Service returned items:', items)),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading mandates', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) => console.log('[Effects] loadById caught, id=', id)),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[Effects] HTTP returned entity:', entity)
          ),
          map((raw) => {
            // Rebuild the entity with a guaranteed subSectorIdList
            const entity: Mandate = {
              ...raw,
            };

            console.log('[Effects] normalized entity:', entity);
            return ActionsList.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error('[Effects] loadById FAILURE', error);
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
        const dto = payload as Omit<Mandate, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Mandate,
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
              entity: EntityNames.Mandate,
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

  performWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.performWorkflowActionEntity),
      mergeMap(({ id, changes }) =>
        this.service.performWorkflowAction(id, changes).pipe(
          mergeMap(() => [
            ActionsList.performWorkflowActionEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.MandateWorkFlowAction,
              operation: 'update',
            }),
          ]),
          catchError((error) =>
            of(ActionsList.performWorkflowActionEntityFailure({ error }))
          )
        )
      )
    )
  );
  loadWorkflowHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadWorkflowHistory),
      mergeMap(({ mandateId }) =>
        this.service.getWorkflowHistoryByMandateId(mandateId).pipe(
          map((history) => ActionsList.loadWorkflowHistorySuccess({ history })),
          catchError((error) =>
            of(ActionsList.loadWorkflowHistoryFailure({ error }))
          )
        )
      )
    )
  );
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByClientId),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          map((result) => ActionsList.loadByClientIdSuccess({ result })),
          catchError((error) =>
            of(ActionsList.loadByClientIdFailure({ error }))
          )
        )
      )
    )
  );
}
