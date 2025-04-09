import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientTypeActions from './client-types.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypeService } from '../../../../../shared/services/types.service';

@Injectable()
export class ClientTypesEffects {
  constructor(private actions$: Actions, private typeService: TypeService) {}

  loadClientTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientTypeActions.loadClientTypes),
      switchMap(() =>
        this.typeService.getAllTypes().pipe(
          map((response) =>
            ClientTypeActions.loadClientTypesSuccess({ types: response.items })
          ),
          catchError((error) =>
            of(ClientTypeActions.loadClientTypesFailure({ error }))
          )
        )
      )
    )
  );
}
