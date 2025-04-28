import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SectorActions from './sector.actions';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SectorEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadSectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.loadSectors),
      switchMap(() =>
        this.http
          .get<{ items: any[] }>(`${environment.apiUrl}Sectors/GetAllSectors`)
          .pipe(
            map((response) =>
              SectorActions.loadSectorsSuccess({ sectors: response.items })
            ),
            catchError((error) =>
              of(SectorActions.loadSectorsFailure({ error }))
            )
          )
      )
    )
  );
  loadSectorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.loadSectorById),
      switchMap(({ id }) =>
        this.http
          .get<any>(`${environment.apiUrl}Sectors/SectorId?id=${id}`)
          .pipe(
            map((sector) => SectorActions.loadSectorByIdSuccess({ sector })),
            catchError((error) =>
              of(SectorActions.loadSectorByIdFailure({ error }))
            )
          )
      )
    )
  );
}
