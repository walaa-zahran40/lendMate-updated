import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateAdditionalTermsService } from './mandate-additional-terms.service';
import * as ActionsList from './mandate-additional-terms.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
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
  ) {
    console.log('trr', this.route.snapshot);
  }

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
        tap(() => {
          // 1) re-fetch the full leasing-mandates list
          this.mandatesFacade.loadAll();
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
      map(() => ActionsList.loadAll({}))
    )
  );
}
