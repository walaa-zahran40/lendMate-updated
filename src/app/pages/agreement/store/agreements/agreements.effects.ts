import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { LeasingAgreementsActions } from './agreements.actions';
import { LeasingAgreementsService } from './agreements.service';

@Injectable()
export class LeasingAgreementsEffects {
  private actions$ = inject(Actions);
  private api = inject(LeasingAgreementsService);

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
