import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateOfficersActions as A } from './mandate-officers.actions';
import { MandateOfficersService } from './mandate-officers.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MandateOfficer } from './mandate-officer.model';

@Injectable()
export class MandateOfficersEffects {
  private actions$ = inject(Actions);
  private api = inject(MandateOfficersService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadAllRequested),
      switchMap(({ pageNumber }) =>
        this.api.getAll(pageNumber).pipe(
          map((response) => A.loadAllSucceeded({ response, pageNumber })),
          catchError((err) => of(A.loadAllFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  loadByMandate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadByMandateRequested),
      switchMap(({ mandateId }) =>
        this.api.getByMandateId(mandateId).pipe(
          map((officers) => A.loadByMandateSucceeded({ mandateId, officers })),
          catchError((err) =>
            of(A.loadByMandateFailed({ mandateId, error: this.errMsg(err) }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadOneRequested),
      switchMap(({ mandateOfficerId }) =>
        this.api.getByMandateOfficerId(mandateOfficerId).pipe(
          map((officer) => A.loadOneSucceeded({ officer })),
          catchError((err) => of(A.loadOneFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.createRequested),
      mergeMap(({ dto }) =>
        this.api.create(dto).pipe(
          mergeMap((officer) => [
            A.createSucceeded({ officer }),
            A.loadByMandateRequested({ mandateId: officer.mandateId }),
          ]),
          catchError((err) => of(A.createFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  // mandate-officers.effects.ts
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.updateRequested),
      mergeMap(({ dto }) =>
        this.api.update(dto).pipe(
          tap((resp) => {
            console.log('[MandateOfficersEffects] update response:', resp);
            console.log('[MandateOfficersEffects] dto used for update:', dto);
          }),
          // If backend returns null/void or misses fields, synthesize from dto
          map((resp) => {
            const officer =
              resp && typeof resp === 'object'
                ? resp
                : {
                    id: dto.id,
                    mandateId: dto.mandateId,
                    officerId: dto.officerId,
                  };
            return officer as MandateOfficer;
          }),
          mergeMap((officer) => {
            const mandateId = officer?.mandateId ?? dto.mandateId; // ✅ fallback
            return [
              A.updateSucceeded({ officer }),
              A.loadByMandateRequested({ mandateId }),
            ];
          }),
          catchError((err) => of(A.updateFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.deleteRequested),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => A.deleteSucceeded({ id })),
          catchError((err) => of(A.deleteFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  private errMsg(err: any): string {
    return err?.error?.message || err?.message || 'Something went wrong';
  }
}
