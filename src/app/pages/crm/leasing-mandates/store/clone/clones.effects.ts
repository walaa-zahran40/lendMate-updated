import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClonesService } from './clones.service';
import * as ActionsList from './clones.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Clone } from './clone.model';
import { EntityNames } from '../../../../../shared/constants/entity-names';
import { ClonesFacade } from './clones.facade';

@Injectable()
export class ClonesEffects {
  constructor(
    private actions$: Actions,
    private service: ClonesService,
    private mandatesFacade: ClonesFacade
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),

      mergeMap(() =>
        this.service.getAll().pipe(
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            console.error('⚠️ Error loading clones', err);
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
            const entity: Clone = {
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

  // this listens for the *createClone* action
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createClone), // ← use the action creator imported above
      mergeMap(({ payload }) =>
        this.service.create(payload).pipe(
          map((result) => ActionsList.createCloneSuccess({ clone: result })),
          catchError((error) => of(ActionsList.createCloneFailure({ error })))
        )
      )
    )
  );

  // this listens for the *createCloneSuccess* action
  navigateOnCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.createCloneSuccess),
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
              entity: EntityNames.Clone,
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
  // refreshList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       ActionsList.createEntitySuccess,
  //       ActionsList.updateEntitySuccess,
  //       ActionsList.deleteEntitySuccess
  //     ),
  //     map(() => ActionsList.loadAll({}))
  //   )
  // );
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByClientId),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          map((result) => ActionsList.loadByClientIdSuccess({ result })),
          catchError((error) =>
            of(ActionsList.loadByClientIdFailure({ error }))
          )
        )
      )
    )
  );
}
