import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GuarantorActions from './client-guarantors.actions';
import { ClientGuarantorsService } from './client-guarantors.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientGuarantorsEffects {
  loadGuarantors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuarantorActions.loadGuarantors),
      mergeMap((action) =>
        this.service.getGuarantors(action.clientId).pipe(
          map((list) =>
            GuarantorActions.loadGuarantorsSuccess({ guarantors: list })
          ),
          catchError((error) =>
            of(GuarantorActions.loadGuarantorsFailure({ error }))
          )
        )
      )
    )
  );

  createGuarantor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuarantorActions.createGuarantor),
      mergeMap((action) =>
        this.service.createGuarantor(action.guarantor).pipe(
          map((g) => GuarantorActions.createGuarantorSuccess({ guarantor: g })),
          catchError((error) =>
            of(GuarantorActions.createGuarantorFailure({ error }))
          )
        )
      )
    )
  );

  updateGuarantor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuarantorActions.updateGuarantor),
      mergeMap((action) =>
        this.service.updateGuarantor(action.id, action.guarantor).pipe(
          map((g) => GuarantorActions.updateGuarantorSuccess({ guarantor: g })),
          catchError((error) =>
            of(GuarantorActions.updateGuarantorFailure({ error }))
          )
        )
      )
    )
  );

  deleteGuarantor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuarantorActions.deleteGuarantor),
      mergeMap((action) =>
        this.service.deleteGuarantor(action.id).pipe(
          map(() => GuarantorActions.deleteGuarantorSuccess({ id: action.id })),
          catchError((error) =>
            of(GuarantorActions.deleteGuarantorFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuarantorActions.loadGuarantorsHistory),
      mergeMap(() =>
        this.service.getGuarantorsHistory().pipe(
          map((history) =>
            GuarantorActions.loadGuarantorsHistorySuccess({ history })
          ),
          catchError((error) =>
            of(GuarantorActions.loadGuarantorsHistoryFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientGuarantorsService
  ) {}
}
