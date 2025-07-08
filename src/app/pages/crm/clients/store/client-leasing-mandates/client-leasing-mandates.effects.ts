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
      mergeMap(({ payload }) => {
        const dto = payload as Omit<MandateDetail, 'id'>;
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
}
