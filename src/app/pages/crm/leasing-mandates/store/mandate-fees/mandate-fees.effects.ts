import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateFeesService } from './mandate-fees.service';
import * as ActionsList from './mandate-fees.actions';
import { catchError, exhaustMap, filter, map, mergeMap, of, tap } from 'rxjs';
import { MandateFee } from './mandate-fee.model';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { ActivatedRoute, Router } from '@angular/router';
import { MandateFeesFacade } from './mandate-fees.facade';

@Injectable()
export class MandateFeesEffects {
  constructor(
    private actions$: Actions,
    private service: MandateFeesService,
    private router: Router,
    private mandatesFacade: MandateFeesFacade,
    private route: ActivatedRoute
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
            console.error('⚠️ Error loading mandateAdditionalTerms', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) => console.log('[Effects] loadById caught, id=', id)),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[Effects] HTTP returned entity:', entity)
          ),
          map((rawEntities) => {
            // Convert object of keyed entities into array
            const entities: MandateFee[] = Array.isArray(rawEntities)
              ? rawEntities
              : Object.values(rawEntities); // in case it's an object with keys 0,1,2,...

            console.log('[Effects] normalized entities:', entities);
            return ActionsList.loadByIdSuccess({ entities });
          }),
          catchError((error) => {
            console.error('[Effects] loadById FAILURE', error);
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
        tap(({ entities }) =>
          console.log(
            '✨ Effect: loadByIdSuccess action caught, entities:',
            entities
          )
        )
      ),
    { dispatch: false }
  );

  // this listens for the *createMandateFee* action
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createMandateFee), // ← use the action creator imported above
      mergeMap(({ payload }) => {
        // Ensure mandateId is present and not undefined
        if (payload.mandateId === undefined) {
          return of(
            ActionsList.createMandateFeeFailure({
              error: new Error('mandateId is required'),
            })
          );
        }
        // Cast payload to Omit<MandateFee, "id">
        const createPayload = {
          ...payload,
          mandateId: payload.mandateId as number,
        } as Omit<MandateFee, 'id'>;
        return this.service.create(createPayload).pipe(
          map((result) =>
            ActionsList.createMandateFeeSuccess({
              mandateAdditionalTerm: result,
            })
          ),
          catchError((error) =>
            of(ActionsList.createMandateFeeFailure({ error }))
          )
        );
      })
    )
  );

  // this listens for the *createMandateFeeSuccess* action
  navigateOnCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.createMandateFeeSuccess),
        tap(({ mandateAdditionalTerm }) => {
          const mandateId = mandateAdditionalTerm?.mandateId;
          if (mandateId) {
            this.mandatesFacade.loadById(mandateId);
          }
        })
      ),
    { dispatch: false }
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.MandateFee,
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
      map((action) => {
        let mandateId: number | null = null;

        if (
          'mandateAdditionalTerm' in action &&
          action.mandateAdditionalTerm &&
          typeof action.mandateAdditionalTerm === 'object' &&
          'mandateId' in action.mandateAdditionalTerm
        ) {
          // From createEntitySuccess
          mandateId = (action.mandateAdditionalTerm as { mandateId: number })
            .mandateId;
        } else if ('changes' in action && action.changes?.mandateId) {
          // From updateEntitySuccess
          mandateId = action.changes.mandateId;
        } else {
          // You can optionally skip deleteEntitySuccess or handle it if needed
          console.warn('⚠️ mandateId missing from action:', action);
        }

        if (mandateId == null) {
          // Skip if mandateId not available
          return { type: '[MandateFees] No-op' };
        }

        return ActionsList.loadById({ id: mandateId });
      }),
      // Optional: filter out No-op actions
      filter((action) => action.type !== '[MandateFees] No-op')
    )
  );
}
