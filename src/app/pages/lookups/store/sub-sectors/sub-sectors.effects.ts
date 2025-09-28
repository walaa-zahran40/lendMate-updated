import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubSectorsService } from './sub-sectors.service';
import * as ActionsList from './sub-sectors.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { SubSector } from './sub-sector.model';

@Injectable()
export class SubSectorsEffects {
  constructor(private actions$: Actions, private svc: SubSectorsService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.svc.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading subSectors', err);
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
        // payload is Partial<Omit<SubSector,'id'>>, but our service needs the full DTO shape
        const dto = payload as Omit<SubSector, 'id'>;
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
      map(() => ActionsList.loadSubSectorHistory())
    )
  );
  loadSubSectorHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadSubSectorHistory),
      switchMap(() =>
        this.svc.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadSubSectorHistorySuccess({
              history,
            })
          ),
          catchError((error) =>
            of(ActionsList.loadSubSectorHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
