import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateContactPersonsActions as A } from './mandate-contact-persons.actions';
import { MandateContactPersonsService } from './mandate-contact-persons.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MandateContactPerson } from './mandate-contact-person.model';

@Injectable()
export class MandateContactPersonsEffects {
  private actions$ = inject(Actions);
  private api = inject(MandateContactPersonsService);

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
          map((contactPersons) =>
            A.loadByMandateSucceeded({ mandateId, contactPersons })
          ),
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
      switchMap(({ mandateContactPersonId }) =>
        this.api.getByMandateContactPersonId(mandateContactPersonId).pipe(
          map((contactPerson) => A.loadOneSucceeded({ contactPerson })),
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
          mergeMap((contactPerson) => [
            A.createSucceeded({ contactPerson }),
            A.loadByMandateRequested({ mandateId: contactPerson.mandateId }),
          ]),
          catchError((err) => of(A.createFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  // mandate-contactPersons.effects.ts
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.updateRequested),
      mergeMap(({ dto }) =>
        this.api.update(dto).pipe(
          tap((resp) => {
            console.log(
              '[MandateContactPersonsEffects] update response:',
              resp
            );
            console.log(
              '[MandateContactPersonsEffects] dto used for update:',
              dto
            );
          }),
          // If backend returns null/void or misses fields, synthesize from dto
          map((resp) => {
            const contactPerson =
              resp && typeof resp === 'object'
                ? resp
                : {
                    id: dto.id,
                    mandateId: dto.mandateId,
                    contactPersonId: dto.contactPersonId,
                  };
            return contactPerson as MandateContactPerson;
          }),
          mergeMap((contactPerson) => {
            const mandateId = contactPerson?.mandateId ?? dto.mandateId; // ✅ fallback
            return [
              A.updateSucceeded({ contactPerson }),
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
