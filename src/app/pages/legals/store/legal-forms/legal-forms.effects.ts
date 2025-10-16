import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LegalFormActions from './legal-forms.actions';
import { LegalFormsService } from './legal-forms.service';

@Injectable()
export class LegalFormsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.loadLegalForms),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            LegalFormActions.loadLegalFormsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(LegalFormActions.loadLegalFormsFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.loadLegalFormsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            LegalFormActions.loadLegalFormsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(LegalFormActions.loadLegalFormsHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.loadLegalForm),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((legalForm) =>
            LegalFormActions.loadLegalFormSuccess({ legalForm })
          ),
          catchError((error) =>
            of(LegalFormActions.loadLegalFormFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.createLegalForm),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((legalForm) =>
            LegalFormActions.createLegalFormSuccess({ legalForm })
          ),
          catchError((error) =>
            of(LegalFormActions.createLegalFormFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.updateLegalForm),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((legalForm) =>
            LegalFormActions.updateLegalFormSuccess({ legalForm })
          ),
          catchError((error) =>
            of(LegalFormActions.updateLegalFormFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormActions.deleteLegalForm),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => LegalFormActions.deleteLegalFormSuccess({ id })),
          catchError((error) =>
            of(LegalFormActions.deleteLegalFormFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LegalFormActions.createLegalFormSuccess,
        LegalFormActions.updateLegalFormSuccess,
        LegalFormActions.deleteLegalFormSuccess
      ),
      map(() => LegalFormActions.loadLegalForms())
    )
  );
  constructor(
    private actions$: Actions,
    private service: LegalFormsService
  ) {}
}
