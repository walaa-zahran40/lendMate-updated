import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DepartmentManagerActions from './department-managers.actions';
import { DepartmentManagersService } from './department-managers.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentManager } from './department-manager.model';

@Injectable()
export class DepartmentManagersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.loadDepartmentManagers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            DepartmentManagerActions.loadDepartmentManagersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.loadDepartmentManagersFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.loadDepartmentManagersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            DepartmentManagerActions.loadDepartmentManagersHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.loadDepartmentManagersHistoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.loadDepartmentManager),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((department) =>
            DepartmentManagerActions.loadDepartmentManagerSuccess({
              department,
            })
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.loadDepartmentManagerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.createDepartmentManager),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((department) =>
            DepartmentManagerActions.createDepartmentManagerSuccess({
              department,
            })
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.createDepartmentManagerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.updateDepartmentManager),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject departmentId if missing
            const enriched: DepartmentManager = {
              ...serverReturned,
              departmentId: data.departmentId!,
            };
            console.log('[Effect:update] enriched department →', enriched);
            return DepartmentManagerActions.updateDepartmentManagerSuccess(
              { department: enriched }
            );
          }),
          catchError((error) =>
            of(
              DepartmentManagerActions.updateDepartmentManagerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.deleteDepartmentManager),
      mergeMap(({ id, departmentId }) =>
        this.service.delete(id).pipe(
          map(() =>
            DepartmentManagerActions.deleteDepartmentManagerSuccess({
              id,
              departmentId,
            })
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.deleteDepartmentManagerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by departmentId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DepartmentManagerActions.createDepartmentManagerSuccess,
        DepartmentManagerActions.updateDepartmentManagerSuccess,
        DepartmentManagerActions.deleteDepartmentManagerSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const departmentId =
          'department' in action ? action.department.departmentId : action.departmentId;
        console.log('[RefreshList] extracted departmentId →', departmentId);
        return departmentId;
      }),

      // only continue if it’s a number
      filter(
        (departmentId): departmentId is number => typeof departmentId === 'number'
      ),

      map((departmentId) =>
        DepartmentManagerActions.loadDepartmentManagersByDepartmentId({
          departmentId,
        })
      )
    )
  );

  /**
   * The “by‐departmentId” loader
   */
  loadByDepartmentId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentManagerActions.loadDepartmentManagersByDepartmentId),

      tap((action) =>
        console.log('[Effect:loadByDepartmentId] full action →', action)
      ),
      tap(({ departmentId }) =>
        console.log('[Effect:loadByDepartmentId] departmentId →', departmentId)
      ),

      mergeMap(({ departmentId }) =>
        this.service.getByDepartmentId(departmentId).pipe(
          tap((items) =>
            console.log('[Effect:loadByDepartmentId] response →', items)
          ),
          map((items) =>
            DepartmentManagerActions.loadDepartmentManagersByDepartmentIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              DepartmentManagerActions.loadDepartmentManagersByDepartmentIdFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: DepartmentManagersService
  ) {}
}