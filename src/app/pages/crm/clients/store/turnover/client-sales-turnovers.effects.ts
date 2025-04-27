import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TurnoverActions from './client-sales-turnovers.actions';
import { ClientSalesTurnoversService } from './client-sales-turnovers.service';

@Injectable()
export class ClientSalesTurnoversEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TurnoverActions.loadClientSalesTurnovers),
      mergeMap(({ pageNumber }) =>
        this.service.getAll(pageNumber).pipe(
          map((response) =>
            TurnoverActions.loadClientSalesTurnoversSuccess({
              items: response.items,
              totalCount: response.totalCount,
            })
          ),
          catchError((error) =>
            of(TurnoverActions.loadClientSalesTurnoversFailure({ error }))
          )
        )
      )
    )
  );

  // similarly for history, create, update, delete...

  constructor(
    private actions$: Actions,
    private service: ClientSalesTurnoversService
  ) {}
}
