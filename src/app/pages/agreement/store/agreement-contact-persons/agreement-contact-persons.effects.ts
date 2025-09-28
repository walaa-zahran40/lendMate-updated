import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AgreementContactPersonsActions as A } from './agreement-contact-persons.actions';
import { AgreementContactPersonsService } from './agreement-contact-persons.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AgreementContactPerson } from './agreement-contact-person.model';

@Injectable()
export class AgreementContactPersonsEffects {
  private actions$ = inject(Actions);
  private api = inject(AgreementContactPersonsService);

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

  loadByAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadByAgreementRequested),
      switchMap(({ agreementId }) =>
        this.api.getByAgreementId(agreementId).pipe(
          map((contactPersons) =>
            A.loadByAgreementSucceeded({ agreementId, contactPersons })
          ),
          catchError((err) =>
            of(
              A.loadByAgreementFailed({ agreementId, error: this.errMsg(err) })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadOneRequested),
      switchMap(({ agreementContactPersonId }) =>
        this.api.getByAgreementContactPersonId(agreementContactPersonId).pipe(
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
            A.loadByAgreementRequested({
              agreementId: contactPerson.agreementId,
            }),
          ]),
          catchError((err) => of(A.createFailed({ error: this.errMsg(err) })))
        )
      )
    )
  );

  // agreement-contactPersons.effects.ts
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.updateRequested),
      mergeMap(({ dto }) =>
        this.api.update(dto).pipe(
          tap((resp) => {
            console.log(
              '[AgreementContactPersonsEffects] update response:',
              resp
            );
            console.log(
              '[AgreementContactPersonsEffects] dto used for update:',
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
                    agreementId: dto.agreementId,
                    contactPersonId: dto.contactPersonId,
                  };
            return contactPerson as AgreementContactPerson;
          }),
          mergeMap((contactPerson) => {
            const agreementId = contactPerson?.agreementId ?? dto.agreementId; // ✅ fallback
            return [
              A.updateSucceeded({ contactPerson }),
              A.loadByAgreementRequested({ agreementId }),
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
