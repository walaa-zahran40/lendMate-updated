import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MandateAdditionalTermsService } from './client-mandate-additional-terms.service';
import * as ActionsList from './client-mandate-additional-terms.actions';
import {
  catchError,
  exhaustMap,
  mergeMap,
  map,
  filter,
  tap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MandateAdditionalTerm } from './client-mandate-additional-term.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityNames } from '../../../../../../../shared/constants/entity-names';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Selectors from './client-mandate-additional-terms.selectors';

@Injectable()
export class ClientsMandateAdditionalTermsEffects {
  constructor(
    private actions$: Actions,
    private service: MandateAdditionalTermsService,
    private router: Router,
    private store: Store,
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
      tap(({ id }) => console.log('🎯 Effect: loadById → HTTP for', id)),

      // grab the currently‐loaded ID from the store
      withLatestFrom(this.store.select(Selectors.selectLoadedId)),

      // only continue if they're *different*
      filter(([{ id }, loadedId]) => id !== loadedId),

      // now it's safe to fetch
      tap(([{ id }]) => console.log('[Effects] loadById → fetching id=', id)),
      switchMap(([{ id }]) =>
        this.service.getById(id).pipe(
          tap((data) => console.log('[Service] getById returned', data)),
          map((data) => {
            const entities = Array.isArray(data) ? data : [data];
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
  // ─── Load single additional-term by its ID ────────────────────────────────
  loadByAdditionalId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByAdditionalId),
      tap(({ id }) => console.log('[Effects] loadByAdditionalId → id=', id)),
      exhaustMap(({ id }) =>
        this.service.getByMandateAdditionalId(id).pipe(
          tap((entity) =>
            console.log('[Service] getByMandateAdditionalId returned', entity)
          ),
          map((entity) => ActionsList.loadByAdditionalIdSuccess({ entity })),
          catchError((error) => {
            console.error('[Effects] loadByAdditionalId FAILURE', error);
            return of(ActionsList.loadByAdditionalIdFailure({ error }));
          })
        )
      )
    )
  );
}
