import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './evaluation-information.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { EvaluationInformation } from './evaluation-information.model';
import { EvaluationInformationService } from './evaluation-information.service';

@Injectable()
export class EvaluationInformationEffects {
  constructor(
    private actions$: Actions,
    private service: EvaluationInformationService
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
            console.error('⚠️ Error loading evaluationInformation', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  // evaluationInformation.effects.ts
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('[EvaluationInformationEffects] loadById', { id })
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log(
              '[EvaluationInformationEffects] service.getById ->',
              entity
            )
          ),
          map((entity) => {
            if (!entity || typeof entity !== 'object' || entity.id == null) {
              console.error(
                '[EvaluationInformationEffects] Invalid entity from service:',
                entity
              );
              throw new Error(
                'Invalid EvaluationInformation payload (missing id)'
              );
            }
            return ActionsList.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error(
              '[EvaluationInformationEffects] getById error',
              error
            );
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
        const dto = payload as Omit<EvaluationInformation, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.EvaluationInformation,
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
              entity: EntityNames.EvaluationInformation,
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
  loadEvaluationInformationHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadEvaluationInformationHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadEvaluationInformationHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadEvaluationInformationHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
