import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommunicationTypesService } from './communication-types.service';
import * as ActionsList from './communication-types.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CommunicationType } from './communication-type.model';
import { EntityNames } from '../../../../shared/constants/entity-names';

@Injectable()
export class CommunicationTypesEffects {
  constructor(
    private actions$: Actions,
    private svc: CommunicationTypesService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.svc.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading communication-action-types', err);
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
        this.svc.getById(id).pipe(
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
        const dto = payload as Omit<CommunicationType, 'id'>;
        return this.svc.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.CommunicationType,
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
        this.svc.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.loadAll({}), // 👈 this is crucial
            ActionsList.entityOperationSuccess({
              entity: EntityNames.CommunicationType,
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
        this.svc.delete(id).pipe(
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
      map(() => ActionsList.loadCommunicationTypeHistory())
    )
  );
  // Load authorization group officer history
  loadCommunicationTypeHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadCommunicationTypeHistory),
      switchMap(() =>
        this.svc.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadCommunicationTypeHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadCommunicationTypeHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
