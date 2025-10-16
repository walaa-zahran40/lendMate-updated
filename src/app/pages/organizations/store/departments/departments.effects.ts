import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DepartmentActions from './departments.actions';
import { DepartmentsService } from './departments.service';

@Injectable()
export class DepartmentsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartments),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            DepartmentActions.loadDepartmentsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(DepartmentActions.loadDepartmentsFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartmentsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            DepartmentActions.loadDepartmentsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(DepartmentActions.loadDepartmentsHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartment),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((Department) =>
            DepartmentActions.loadDepartmentSuccess({ Department })
          ),
          catchError((error) =>
            of(DepartmentActions.loadDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.createDepartment),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((Department) =>
            DepartmentActions.createDepartmentSuccess({ Department })
          ),
          catchError((error) =>
            of(DepartmentActions.createDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.updateDepartment),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((Department) =>
            DepartmentActions.updateDepartmentSuccess({ Department })
          ),
          catchError((error) =>
            of(DepartmentActions.updateDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.deleteDepartment),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => DepartmentActions.deleteDepartmentSuccess({ id })),
          catchError((error) =>
            of(DepartmentActions.deleteDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DepartmentActions.createDepartmentSuccess,
        DepartmentActions.updateDepartmentSuccess,
        DepartmentActions.deleteDepartmentSuccess
      ),
      map(() => DepartmentActions.loadDepartments())
    )
  );
  constructor(
    private actions$: Actions,
    private service: DepartmentsService
  ) {}
}
