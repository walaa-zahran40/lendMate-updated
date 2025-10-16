// src/app/features/leasing-agreement-files/state/leasing-agreement-files.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LeasingAgreementFilesService } from './agreement-files.service';
import { LeasingAgreementFilesActions as A } from './agreement-files.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AgreementFile } from './agreement-file.model';

@Injectable()
export class LeasingAgreementFilesEffects {
  private actions$ = inject(Actions);
  private api = inject(LeasingAgreementFilesService);
  toArray = <T>(res: any): T[] => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.items)) return res.items;
    if (Array.isArray(res?.data)) return res.data;
    return res ? [res as T] : [];
  };

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadAll),
      mergeMap(() =>
        this.api.getAll().pipe(
          map((res) =>
            A.loadAllSuccess({ items: this.toArray<AgreementFile>(res) })
          ),
          catchError((error) => of(A.loadAllFailure({ error })))
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadHistory),
      mergeMap(() =>
        this.api.getAllHistory().pipe(
          map((res) =>
            A.loadHistorySuccess({ items: this.toArray<AgreementFile>(res) })
          ),
          catchError((error) => of(A.loadHistoryFailure({ error })))
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadById),
      mergeMap(({ id }) =>
        this.api.getById(id).pipe(
          map((item) => A.loadByIdSuccess({ item })),
          catchError((error) => of(A.loadByIdFailure({ error })))
        )
      )
    )
  );

  loadByLeasingAgreementId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadByLeasingAgreementId),
      mergeMap(({ leasingAgreementId }) =>
        this.api.getByLeasingAgreementId(leasingAgreementId).pipe(
          map((res) =>
            A.loadByLeasingAgreementIdSuccess({
              items: this.toArray<AgreementFile>(res),
            })
          ),
          catchError((error) =>
            of(A.loadByLeasingAgreementIdFailure({ error }))
          )
        )
      )
    )
  );

  // leasing-agreement-files.effects.ts
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.create),
      mergeMap(({ payload }) =>
        this.api.create(payload).pipe(
          map((item) => {
            const normalized: AgreementFile = {
              ...item,
              leasingAgreementId:
                (item as any).leasingAgreementId ?? (item as any).agreementId,
            };
            return A.createSuccess({ item: normalized });
          }),
          catchError((error) => of(A.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.update),
      mergeMap(({ id, changes }) =>
        this.api.update(id, changes).pipe(
          // If API returns the updated entity:
          mergeMap((item) => {
            if (!item || item.id == null) {
              // Safety fallback: refetch exact row if backend didn’t return entity
              return this.api
                .getById(id)
                .pipe(map((fresh) => A.updateSuccess({ item: fresh })));
            }
            return of(A.updateSuccess({ item }));
          }),
          catchError((error) => of(A.updateFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.delete),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => A.deleteSuccess({ id })),
          catchError((error) => of(A.deleteFailure({ error })))
        )
      )
    )
  );
}
