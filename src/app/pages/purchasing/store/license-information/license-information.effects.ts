import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './license-information.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { LicenseInformation } from './license-information.model';
import { LicenseInformationService } from './license-information.service';

@Injectable()
export class LicenseInformationEffects {
  constructor(
    private actions$: Actions,
    private service: LicenseInformationService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((items) => console.log('✨ Service returned items:', items)),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading licenseInformation', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  // licenseInformation.effects.ts
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('[LicenseInformationEffects] loadById', { id })
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log(
              '[LicenseInformationEffects] service.getById ->',
              entity
            )
          ),
          map((entity) => {
            if (!entity || typeof entity !== 'object' || entity.id == null) {
              console.error(
                '[LicenseInformationEffects] Invalid entity from service:',
                entity
              );
              throw new Error(
                'Invalid LicenseInformation payload (missing id)'
              );
            }
            return ActionsList.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error('[LicenseInformationEffects] getById error', error);
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
        const dto = payload as Omit<LicenseInformation, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.LicenseInformation,
              operation: 'create',
            }),
          ]),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.LicenseInformation,
              operation: 'update',
            }),
          ]),
          catchError((error) => of(ActionsList.updateEntityFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
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
      map(() => ActionsList.loadAll({}))
    )
  );
  // Load address type history
  loadLicenseInformationHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadLicenseInformationHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadLicenseInformationHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadLicenseInformationHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
