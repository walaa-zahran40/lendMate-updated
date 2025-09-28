import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { LeasingAgreementsActions } from './agreements.actions';
import { LeasingAgreementsService } from './agreements.service';
import { Router } from '@angular/router';

@Injectable()
export class LeasingAgreementsEffects {
  private actions$ = inject(Actions);
  private api = inject(LeasingAgreementsService);
  private router = inject(Router);
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.loadAll),
      mergeMap(() =>
        this.api.getAll().pipe(
          map((res: unknown) => {
            // Normalize common shapes to LeasingAgreement[]
            if (Array.isArray(res)) return res;
            const obj = res as any;
            if (Array.isArray(obj?.items)) return obj.items;
            if (Array.isArray(obj?.data)) return obj.data;
            // Fallback to empty array to avoid runtime crashes
            return [];
          }),
          map((agreements) =>
            LeasingAgreementsActions.loadAllSuccess({ agreements })
          ),
          catchError((err) =>
            of(
              LeasingAgreementsActions.loadAllFailure({
                error: this.errMsg(err),
              })
            )
          )
        )
      )
    )
  ); // agreements.effects.ts
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.loadById),
      switchMap(({ id }) =>
        this.api.getById(id).pipe(
          map((agreement) =>
            LeasingAgreementsActions.loadByIdSuccess({
              agreement,
            })
          ),
          catchError((error) => {
            console.error('[effect] API error', error);
            return of(
              LeasingAgreementsActions.loadByIdFailure({
                error,
              })
            );
          })
        )
      )
    )
  );

  navigateAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LeasingAgreementsActions.createSuccess),
        tap(() => {
          // if you need clientId here, inject Router + a service or read from store
          this.router.navigate(['/agreement/view-agreements']);
        })
      ),
    { dispatch: false }
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.create),
      mergeMap(({ payload }) =>
        this.api.create(payload).pipe(
          map((agreement) =>
            LeasingAgreementsActions.createSuccess({ agreement })
          ),
          catchError((err) =>
            of(
              LeasingAgreementsActions.createFailure({
                error: this.errMsg(err),
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.update),
      mergeMap(({ id, changes }) =>
        this.api.update(id, changes).pipe(
          map((agreement) =>
            LeasingAgreementsActions.updateSuccess({ agreement })
          ),
          catchError((err) =>
            of(
              LeasingAgreementsActions.updateFailure({
                error: this.errMsg(err),
              })
            )
          )
        )
      )
    )
  );
  navigateAfterSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          LeasingAgreementsActions.createSuccess,
          LeasingAgreementsActions.updateSuccess
        ),
        tap(() => {
          this.router.navigate(['/agreement/view-agreements']);
        })
      ),
    { dispatch: false }
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.delete),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => LeasingAgreementsActions.deleteSuccess({ id })),
          catchError((err) =>
            of(
              LeasingAgreementsActions.deleteFailure({
                error: this.errMsg(err),
              })
            )
          )
        )
      )
    )
  );

  workflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeasingAgreementsActions.workflowAction),
      mergeMap(({ request }) =>
        this.api.workflowAction(request).pipe(
          map((agreement) =>
            LeasingAgreementsActions.workflowActionSuccess({ agreement })
          ),
          catchError((err) =>
            of(
              LeasingAgreementsActions.workflowActionFailure({
                error: this.errMsg(err),
              })
            )
          )
        )
      )
    )
  );

  private errMsg(err: any): string {
    return err?.error?.message ?? err?.message ?? 'Unexpected error';
  }
}
