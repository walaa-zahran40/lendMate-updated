import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LicenseProvidersService } from './license-providers.service';
import * as ActionsList from './license-providers.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { LicenseProvider } from './license-provider.model';

@Injectable()
export class LicenseProvidersEffects {
  constructor(
    private actions$: Actions,
    private svc: LicenseProvidersService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.svc.getAll().pipe(
          tap((items) => console.log('✨ Service returned items:', items)),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading licenseProviders', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('🔄 Effect: loadById action caught for id=', id)
      ),
      mergeMap(({ id }) =>
        this.svc.getById(id).pipe(
          tap((entity) => console.log('🔄 Service.getById returned:', entity)),
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => {
            console.error('❌ Service.getById error:', error);
            return of(ActionsList.loadByIdFailure({ error }));
          })
        )
      )
    )
  );

  loadByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.loadByIdSuccess),
        tap(({ entity }) =>
          console.log(
            '✨ Effect: loadByIdSuccess action caught, entity:',
            entity
          )
        )
      ),
    { dispatch: false }
  );
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      mergeMap(({ payload }) => {
        // payload is Partial<Omit<LicenseProvider,'id'>>, but our service needs the full DTO shape
        const dto = payload as Omit<LicenseProvider, 'id'>;
        return this.svc.create(dto).pipe(
          map((entity) => ActionsList.createEntitySuccess({ entity })),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.svc.update(id, changes).pipe(
          map(() => ActionsList.updateEntitySuccess({ id, changes })),
          catchError((error) => of(ActionsList.updateEntityFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ id }) =>
        this.svc.delete(id).pipe(
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((error) => of(ActionsList.deleteEntityFailure({ error })))
        )
      )
    )
  );
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ActionsList.createEntitySuccess,
        ActionsList.updateEntitySuccess,
        ActionsList.deleteEntitySuccess
      ),
      map(() => ActionsList.loadLicenseProviderHistory())
    )
  );
  loadLicenseProviderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadLicenseProviderHistory),
      switchMap(() =>
        this.svc.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadLicenseProviderHistorySuccess({
              history,
            })
          ),
          catchError((error) =>
            of(ActionsList.loadLicenseProviderHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
