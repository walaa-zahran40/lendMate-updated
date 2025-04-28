import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CompanyActions from './company-types.actions';
import { CompanyTypesService } from './company-types.service';

@Injectable()
export class CompanyTypesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanyTypes),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            CompanyActions.loadCompanyTypesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(CompanyActions.loadCompanyTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanyTypesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            CompanyActions.loadCompanyTypesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(CompanyActions.loadCompanyTypesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanyType),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((companyType) =>
            CompanyActions.loadCompanyTypeSuccess({ companyType })
          ),
          catchError((error) =>
            of(CompanyActions.loadCompanyTypeFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.createCompanyType),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((companyType) =>
            CompanyActions.createCompanyTypeSuccess({ companyType })
          ),
          catchError((error) =>
            of(CompanyActions.createCompanyTypeFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.updateCompanyType),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((companyType) =>
            CompanyActions.updateCompanyTypeSuccess({ companyType })
          ),
          catchError((error) =>
            of(CompanyActions.updateCompanyTypeFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.deleteCompanyType),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CompanyActions.deleteCompanyTypeSuccess({ id })),
          catchError((error) =>
            of(CompanyActions.deleteCompanyTypeFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: CompanyTypesService
  ) {}
}
