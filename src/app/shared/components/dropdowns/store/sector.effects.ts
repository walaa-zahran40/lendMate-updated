import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SectorActions from './sector.actions';

@Injectable()
export class SectorEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadSectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.loadSectors),
      switchMap(() =>
        this.http.get<{ items: any[] }>('https://192.168.10.67:7070/api/Sectors/GetAllSectors').pipe(
          map(response => SectorActions.loadSectorsSuccess({ sectors: response.items })),
          catchError(error => of(SectorActions.loadSectorsFailure({ error })))
        )
      )
    )
  );
}