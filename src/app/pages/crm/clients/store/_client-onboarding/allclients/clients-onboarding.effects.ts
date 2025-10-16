// clients-onboarding.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsOnboardingService } from './clients-onboarding.service';
import * as ClientsOnboardingActions from './clients-onboarding.actions';
import * as IndividualActions from '../individuals/individuals-onboarding.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ClientOnboarding } from './client-onboarding.model';
import { EntityNames } from '../../../../../../shared/constants/entity-names';

@Injectable()
export class ClientsOnboardingEffects {
  constructor(
    private actions$: Actions,
    private service: ClientsOnboardingService
  ) {}

  // 🔄 Load all
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) =>
            ClientsOnboardingActions.loadAllSuccess({ result: items })
          ),
          catchError((err) => {
            console.error('⚠️ Error loading clientsOnboarding', err);
            return of(ClientsOnboardingActions.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  // 🔄 Load one by ID
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.loadById),
      tap(({ id }) =>
        console.log('[Effects] loadByIdOnboarding caught, id=', id)
      ),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[Effects] HTTP returned entity:', entity)
          ),
          map((raw) => {
            const subSectorIdList =
              raw.subSectorIdList ?? raw.subSectorList ?? [];
            const entity: ClientOnboarding = { ...raw, subSectorIdList };
            console.log('[Effects] normalized entity:', entity);
            return ClientsOnboardingActions.loadByIdSuccess({ entity });
          }),
          catchError((error) => {
            console.error('[Effects] loadByIdOnboarding FAILURE', error);
            return of(ClientsOnboardingActions.loadByIdFailure({ error }));
          })
        )
      )
    )
  );

  // 📣 Log on loadByIdSuccess, no dispatch
  loadByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClientsOnboardingActions.loadByIdSuccess),
        tap(({ entity }) =>
          console.log(
            '✨ Effect: loadByIdSuccessOnboarding caught, entity:',
            entity
          )
        )
      ),
    { dispatch: false }
  );

  // ➕ Create
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.createEntity),
      mergeMap(({ payload }) => {
        const dto = payload as Omit<ClientOnboarding, 'id'>;
        return this.service.create(dto).pipe(
          mergeMap((entity) => [
            ClientsOnboardingActions.createEntitySuccess({ entity }),
            ClientsOnboardingActions.entityOperationSuccess({
              entity: EntityNames.Client,
              operation: 'create',
            }),
          ]),
          catchError((error) =>
            of(ClientsOnboardingActions.createEntityFailure({ error }))
          )
        );
      })
    )
  );

  // ✏️ Update
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.updateEntity),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ClientsOnboardingActions.updateEntitySuccess({ id, changes }),
            ClientsOnboardingActions.entityOperationSuccess({
              entity: EntityNames.Client,
              operation: 'update',
            }),
          ]),
          catchError((error) =>
            of(ClientsOnboardingActions.updateEntityFailure({ error }))
          )
        )
      )
    )
  );

  // 🗑️ Delete
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.deleteEntity),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ClientsOnboardingActions.deleteEntitySuccess({ id })),
          catchError((error) =>
            of(ClientsOnboardingActions.deleteEntityFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * 🔁 Refresh the list after any clients-onboarding change
   * or when a new Individual is created (so it shows up in the clients table immediately).
   */
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientsOnboardingActions.createEntitySuccess,
        ClientsOnboardingActions.updateEntitySuccess,
        ClientsOnboardingActions.deleteEntitySuccess,
        IndividualActions.createEntitySuccess
      ),
      map(() => ClientsOnboardingActions.loadAll({}))
    )
  );

  performWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsOnboardingActions.performWorkflowActionEntity),
      mergeMap(({ id, changes }) =>
        this.service.performWorkflowAction(id, changes).pipe(
          mergeMap(() => [
            ClientsOnboardingActions.performWorkflowActionEntitySuccess({
              id,
              changes,
            }),
            ClientsOnboardingActions.entityOperationSuccess({
              entity: EntityNames.Client,
              operation: 'update',
            }),
          ]),
          catchError((error) =>
            of(
              ClientsOnboardingActions.performWorkflowActionEntityFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
}
