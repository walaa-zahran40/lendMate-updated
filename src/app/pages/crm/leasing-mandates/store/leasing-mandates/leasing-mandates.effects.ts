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

  normalizeMandate = (raw: any): Mandate => ({
    ...raw,
    // prefer flat clientId; else take it from clientView
    clientId: raw?.clientId ?? raw?.clientView?.clientId ?? null,
  });

  // Load all
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      mergeMap(({ pageNumber }) =>
        this.service.getAll(pageNumber).pipe(
          map((items) => items.map(this.normalizeMandate)),
          map((result) => ActionsList.loadAllSuccess({ result })),
          catchError((err) => of(ActionsList.loadAllFailure({ error: err })))
        )
      )
    )
  );

  // Load by id
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          map((raw) => this.normalizeMandate(raw)),
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => of(ActionsList.loadByIdFailure({ error })))
        )
      )
    )
  );

  // Load by client id (normalize too, for consistency)
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByClientId),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          map((result) => result.map(this.normalizeMandate)),
          map((result) => ActionsList.loadByClientIdSuccess({ result })),
          catchError((error) =>
            of(ActionsList.loadByClientIdFailure({ error }))
          )
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
}
