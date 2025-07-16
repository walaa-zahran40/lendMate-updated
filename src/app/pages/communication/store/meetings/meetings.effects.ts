import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MeetingsService } from './meetings.service';
import * as ActionsList from './meetings.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Meeting } from './meeting.model';
import { EntityNames } from '../../../../shared/constants/entity-names';

@Injectable()
export class MeetingsEffects {
  constructor(private actions$: Actions, private service: MeetingsService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByClientId),

      mergeMap(({ id }) =>
        this.service.getByClientId(id).pipe(
          map((entity) => ActionsList.loadByClientIdSuccess({ entity })),
          catchError((error) => {
            return of(ActionsList.loadByClientIdFailure({ error }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),

      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => {
            return of(ActionsList.loadByIdFailure({ error }));
          })
        )
      )
    )
  );

  loadByIdSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(ActionsList.loadByIdSuccess)),
    { dispatch: false }
  );

  loadByClientIdSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(ActionsList.loadByClientIdSuccess)),
    { dispatch: false }
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      mergeMap(({ payload }) => {
        const dto = payload as Omit<Meeting, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Meeting,
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
              entity: EntityNames.Meeting,
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
}
