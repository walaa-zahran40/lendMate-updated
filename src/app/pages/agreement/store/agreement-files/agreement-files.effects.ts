// app/core/agreement-files/data-access/agreement-files.effects.ts
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { AgreementFilesActions } from './agreement-files.actions';
import { AgreementFilesService } from './agreement-files.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AgreementFilesEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(AgreementFilesService);

  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.loadPage),
      switchMap(({ pageNumber }) =>
        this.api.getAll(pageNumber).pipe(
          map((response) =>
            AgreementFilesActions.loadPageSuccess({ response })
          ),
          catchError((err) =>
            of(AgreementFilesActions.loadPageFailure({ error: this.msg(err) }))
          )
        )
      )
    )
  );

  loadByAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.loadByAgreement),
      switchMap(({ agreementId }) =>
        this.api.getByAgreementId(agreementId).pipe(
          map((response) =>
            AgreementFilesActions.loadByAgreementSuccess({
              response,
              agreementId,
            })
          ),
          catchError((err) =>
            of(
              AgreementFilesActions.loadByAgreementFailure({
                error: this.msg(err),
              })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.loadOne),
      switchMap(({ agreementFileId }) =>
        this.api.getByAgreementFileId(agreementFileId).pipe(
          map((entity) => AgreementFilesActions.loadOneSuccess({ entity })),
          catchError((err) =>
            of(AgreementFilesActions.loadOneFailure({ error: this.msg(err) }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.create),
      switchMap(({ agreementId, documentTypeId, expiryDate, file }) =>
        this.api.create({ agreementId, documentTypeId, expiryDate, file }).pipe(
          map((entity) => AgreementFilesActions.createSuccess({ entity })),
          catchError((err) =>
            of(AgreementFilesActions.createFailure({ error: this.msg(err) }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.update),
      switchMap(({ id, payload }) =>
        this.api.update(id, payload).pipe(
          map((entity) => AgreementFilesActions.updateSuccess({ entity })),
          catchError((err) =>
            of(AgreementFilesActions.updateFailure({ error: this.msg(err) }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgreementFilesActions.delete),
      switchMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => AgreementFilesActions.deleteSuccess({ id })),
          catchError((err) =>
            of(AgreementFilesActions.deleteFailure({ error: this.msg(err) }))
          )
        )
      )
    )
  );

  private msg(err: unknown): string {
    if (typeof err === 'string') return err;
    const anyErr = err as any;
    return anyErr?.error?.message ?? anyErr?.message ?? 'Unexpected error';
  }
}
