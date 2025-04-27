import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CRActions from './client-cr-authority-office.actions';
import { ClientCRAuthorityOfficeService } from './client-cr-authority-office.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ClientCRAuthorityOfficeEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CRActions.loadClientCRAuthorityOffices),
      mergeMap(({ page }) =>
        this.service.getAll(page).pipe(
          map((response) =>
            CRActions.loadClientCRAuthorityOfficesSuccess({ response })
          ),
          catchError((error) =>
            of(CRActions.loadClientCRAuthorityOfficesFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CRActions.loadClientCRAuthorityOffice),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((office) =>
            CRActions.loadClientCRAuthorityOfficeSuccess({ office })
          ),
          catchError((error) =>
            of(CRActions.loadClientCRAuthorityOfficeFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CRActions.createClientCRAuthorityOffice),
      mergeMap(({ office }) =>
        this.service.create(office).pipe(
          map((newOffice) =>
            CRActions.createClientCRAuthorityOfficeSuccess({
              office: newOffice,
            })
          ),
          catchError((error) =>
            of(CRActions.createClientCRAuthorityOfficeFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CRActions.updateClientCRAuthorityOffice),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          map((updated) =>
            CRActions.updateClientCRAuthorityOfficeSuccess({ office: updated })
          ),
          catchError((error) =>
            of(CRActions.updateClientCRAuthorityOfficeFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CRActions.deleteClientCRAuthorityOffice),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CRActions.deleteClientCRAuthorityOfficeSuccess({ id })),
          catchError((error) =>
            of(CRActions.deleteClientCRAuthorityOfficeFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientCRAuthorityOfficeService
  ) {}
}
