import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LegalFormLawActions from './legal-form-laws.actions';
import { LegalFormLawsService } from './legal-form-laws.service';

@Injectable()
export class LegalFormLawsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.loadLegalFormLaws),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            LegalFormLawActions.loadLegalFormLawsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(LegalFormLawActions.loadLegalFormLawsFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.loadLegalFormLawsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            LegalFormLawActions.loadLegalFormLawsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(LegalFormLawActions.loadLegalFormLawsHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.loadLegalFormLaw),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((legalFormLaw) =>
            LegalFormLawActions.loadLegalFormLawSuccess({ legalFormLaw })
          ),
          catchError((error) =>
            of(LegalFormLawActions.loadLegalFormLawFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.createLegalFormLaw),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((legalFormLaw) =>
            LegalFormLawActions.createLegalFormLawSuccess({ legalFormLaw })
          ),
          catchError((error) =>
            of(LegalFormLawActions.createLegalFormLawFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.updateLegalFormLaw),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((legalFormLaw) =>
            LegalFormLawActions.updateLegalFormLawSuccess({ legalFormLaw })
          ),
          catchError((error) =>
            of(LegalFormLawActions.updateLegalFormLawFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.deleteLegalFormLaw),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => LegalFormLawActions.deleteLegalFormLawSuccess({ id })),
          catchError((error) =>
            of(LegalFormLawActions.deleteLegalFormLawFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LegalFormLawActions.createLegalFormLawSuccess,
        LegalFormLawActions.updateLegalFormLawSuccess,
        LegalFormLawActions.deleteLegalFormLawSuccess
      ),
      map(() => LegalFormLawActions.loadLegalFormLaws())
    )
  );
  constructor(
    private actions$: Actions,
    private service: LegalFormLawsService
  ) {}
}
