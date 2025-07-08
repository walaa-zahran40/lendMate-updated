import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './client-leasing-mandates.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { MandatesService } from './client-leasing-mandates.service';
import { MandateDetail } from './client-leasing-mandate.model';
import {
  loadAllSuccess,
  loadById,
  loadByIdFailure,
  /* remove or ignore */ loadByIdSuccess,
} from './client-leasing-mandates.actions';

@Injectable()
export class MandatesEffects {
  constructor(private actions$: Actions, private service: MandatesService) {}

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadById),
      exhaustMap(({ id }) =>
        this.service.getByClientId(id).pipe(
          // result is MandateDetail[]
          map((result) =>
            loadAllSuccess({
              result: Array.isArray(result) ? result : [result],
            })
          ), // ensure array
          catchError((error) => of(loadByIdFailure({ error })))
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
      mergeMap(({ clientId, payload }) =>
        this.service.create(payload).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ clientId, entity }),
            ActionsList.entityOperationSuccess({
              clientId,
              entity: EntityNames.Mandate,
              operation: 'create',
            }),
            // kick off reload of this client's mandates:
            ActionsList.loadById({ id: clientId }),
          ]),
          catchError((error) =>
            of(ActionsList.createEntityFailure({ clientId, error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ clientId, id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ clientId, id, changes }),
            ActionsList.entityOperationSuccess({
              clientId,
              entity: EntityNames.Mandate,
              operation: 'update',
            }),
            ActionsList.loadById({ id: clientId }),
          ]),
          catchError((error) =>
            of(ActionsList.updateEntityFailure({ clientId, error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ clientId, id }) =>
        this.service.delete(id).pipe(
          mergeMap(() => [
            ActionsList.deleteEntitySuccess({ clientId, id }),
            ActionsList.entityOperationSuccess({
              clientId,
              entity: EntityNames.MandateDetail,
              operation: 'delete',
            }),
            ActionsList.loadById({ id: clientId }),
          ]),
          catchError((error) =>
            of(ActionsList.deleteEntityFailure({ clientId, error }))
          )
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
      map(({ clientId }) =>
        // pass it _as_ the `id` param that loadById expects
        ActionsList.loadById({ id: clientId })
      )
    )
  );
  /** ➕ effect to call getByLeasingId() */
  loadByLeasingId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByLeasingId),
      exhaustMap(({ id }) =>
        this.service.getByLeasingId(id).pipe(
          map((entity) => ActionsList.loadByLeasingIdSuccess({ entity })),
          catchError((error) =>
            of(ActionsList.loadByLeasingIdFailure({ error }))
          )
        )
      )
    )
  );
  performWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.performWorkflowActionEntity),
      mergeMap(({ clientId, id, changes }) =>
        this.service.performWorkflowAction(id, changes).pipe(
          mergeMap(() => [
            // ① workflow action success
            ActionsList.performWorkflowActionEntitySuccess({
              clientId,
              id,
              changes,
            }),
            // ② generic op success (already expects clientId)
            ActionsList.entityOperationSuccess({
              clientId,
              entity: EntityNames.MandateWorkFlowAction,
              operation: 'update',
            }),
            // ③ finally reload that client’s mandates
            ActionsList.loadById({ id: clientId }),
          ]),
          catchError((error) =>
            of(
              // now matches props<{clientId, error}>
              ActionsList.performWorkflowActionEntityFailure({
                clientId,
                error,
              })
            )
          )
        )
      )
    )
  );
}
