import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './agreement-files.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { EntityNames } from '../../../../shared/constants/entity-names';
import { AgreementFile } from './agreement-file.model';
import { AgreementFilesService } from './agreement-files.service';

@Injectable()
export class AgreementFilesEffects {
  constructor(
    private actions$: Actions,
    private service: AgreementFilesService
  ) {}
  createBinary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntityBinary),
      switchMap(({ formData }) =>
        this.service.create(formData).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.AgreementFile,
              operation: 'create',
            }),
          ]),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        )
      )
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading assets', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) => console.log('[AgreementFilesEffects] loadById', { id })),
      switchMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[AgreementFilesEffects] service.getById ->', entity)
          ),
          map((entity) => ActionsList.loadByIdSuccess({ entity }))
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
        const dto = payload as Omit<AgreementFile, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.AgreementFile,
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
              entity: EntityNames.AgreementFile,
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
  loadAgreementFileHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAgreementFileHistory),
      switchMap(() =>
        this.service.getAllHistory().pipe(
          map((history) =>
            ActionsList.loadAgreementFileHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ActionsList.loadAgreementFileHistoryFailure({ error }))
          )
        )
      )
    )
  );
}
