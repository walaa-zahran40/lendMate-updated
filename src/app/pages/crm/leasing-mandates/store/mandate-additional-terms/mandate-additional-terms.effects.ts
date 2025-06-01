import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, of, exhaustMap } from 'rxjs';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { MandateAdditionalTermsFacade } from './mandate-additional-terms.facade';
import { MandateAdditionalTermsService } from './mandate-additional-terms.service';
import * as ActionsList from './mandate-additional-terms.actions';
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
          map((raw) => {
            // Rebuild the entity with a guaranteed subSectorIdList
            const entity: MandateAdditionalTerm = {
              ...raw,
            };

            console.log('[Effects] normalized entity:', entity);
            return ActionsList.loadByIdSuccess({ entity });
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
        tap(({ entity }) =>
          console.log(
            '✨ Effect: loadByIdSuccess action caught, entity:',
            entity
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
        // Ensure mandateId is present and is a number
        if (typeof payload.mandateId !== 'number') {
          throw new Error('mandateId is required and must be a number');
        }
        // Remove id if present, as per Omit<MandateAdditionalTerm, "id">
        const { id, ...rest } = payload as MandateAdditionalTerm;
        return this.service.create(rest).pipe(
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
