import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MeetingTypesService } from './meeting-types.service';
import * as ActionsList from './meeting-types.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MeetingType } from './meeting-type.model';

@Injectable()
export class MeetingTypesEffects {
  constructor(private actions$: Actions, private svc: MeetingTypesService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.svc.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading meetingTypes', err);
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
        // payload is Partial<Omit<MeetingType,'id'>>, but our service needs the full DTO shape
        const dto = payload as Omit<MeetingType, 'id'>;
        return this.svc.create(dto).pipe(
          map((entity) => ActionsList.createEntitySuccess({ entity })),
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
          map(() => ActionsList.updateEntitySuccess({ id, changes })),
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
      map(() => ActionsList.loadMeetingTypeHistory())
    )
  );
  loadMeetingTypeHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadMeetingTypeHistory),
      switchMap(() =>
        this.svc.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadMeetingTypeHistorySuccess({
              history,
            })
          ),
          catchError((error) =>
            of(ActionsList.loadMeetingTypeHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
