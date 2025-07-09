import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClonesService } from './client-clones.service';
import * as ActionsList from './client-clones.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Clone } from './client-clone.model';
import { ClientsClonesFacade } from './client-clones.facade';
import { EntityNames } from '../../../../../../../shared/constants/entity-names';

@Injectable()
export class ClientsClonesEffects {
  constructor(
    private actions$: Actions,
    private service: ClonesService,
    private mandatesFacade: ClientsClonesFacade
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
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByClientId),
      exhaustMap(({ id }) =>
        this.service.getByClientId(id).pipe(
          map((clones: Clone[]) =>
            ActionsList.loadByClientIdSuccess({ result: clones })
          ),
          catchError((err) =>
            of(ActionsList.loadByClientIdFailure({ error: err }))
          )
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
  reloadAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createCloneSuccess),
      map(({ clone }) => ActionsList.loadByClientId({ id: clone.clientId! }))
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
}
