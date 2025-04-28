import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SubSectorActions from './sub-sector.actions';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SubSectorEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadSubSectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubSectorActions.loadSubSectors),
      switchMap(() =>
        this.http
          .get<{ items: any[] }>(
            `${environment.apiUrl}SubSectors/GetAllSubSectors`
          )
          .pipe(
            map((response) =>
              SubSectorActions.loadSubSectorsSuccess({
                subSectors: response.items,
              })
            ),
            catchError((error) =>
              of(SubSectorActions.loadSubSectorsFailure({ error }))
            )
          )
      )
    )
  );
  loadSubSectorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubSectorActions.loadSubSectorById),
      switchMap(({ id }) =>
        this.http
          .get<any>(`${environment.apiUrl}SubSectors/SubSectorId?id=${id}`)
          .pipe(
            map((subSector) =>
              SubSectorActions.loadSubSectorsByIdSuccess({ subSector })
            ),
            catchError((error) =>
              of(SubSectorActions.loadSubSectorsByIdFailure({ error }))
            )
          )
      )
    )
  );
}
