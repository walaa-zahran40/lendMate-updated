import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateAdditionalTermsService } from './mandate-additional-terms.service';
import * as ActionsList from './mandate-additional-terms.actions';
import { catchError, exhaustMap, filter, map, mergeMap, of, tap } from 'rxjs';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { ActivatedRoute, Router } from '@angular/router';
import { MandateAdditionalTermsFacade } from './mandate-additional-terms.facade';

@Injectable()
export class MandateAdditionalTermsEffects {
  constructor(
    private actions$: Actions,
    private service: MandateAdditionalTermsService,
    private router: Router,
    private mandatesFacade: MandateAdditionalTermsFacade,
    private route: ActivatedRoute
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
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
            const entities: MandateAdditionalTerm[] = Array.isArray(rawEntities)
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

  // this listens for the *createMandateAdditionalTerm* action
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createMandateAdditionalTerm), // ← use the action creator imported above
      mergeMap(({ payload }) => {
        // Ensure mandateId is present and not undefined
        if (payload.mandateId === undefined) {
          return of(
            ActionsList.createMandateAdditionalTermFailure({
              error: new Error('mandateId is required'),
            })
          );
        }
        // Cast payload to Omit<MandateAdditionalTerm, "id">
        const createPayload = {
          ...payload,
          mandateId: payload.mandateId as number,
        } as Omit<MandateAdditionalTerm, 'id'>;
        return this.service.create(createPayload).pipe(
          map((result) =>
            ActionsList.createMandateAdditionalTermSuccess({
              mandateAdditionalTerm: result,
            })
          ),
          catchError((error) =>
            of(ActionsList.createMandateAdditionalTermFailure({ error }))
          )
        );
      })
    )
  );

  // this listens for the *createMandateAdditionalTermSuccess* action
  navigateOnCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.createMandateAdditionalTermSuccess),
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
              entity: EntityNames.MandateAdditionalTerm,
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
          return { type: '[MandateAdditionalTerms] No-op' };
        }

        return ActionsList.loadById({ id: mandateId });
      }),
      // Optional: filter out No-op actions
      filter((action) => action.type !== '[MandateAdditionalTerms] No-op')
    )
  );
}
