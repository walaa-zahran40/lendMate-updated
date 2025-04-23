import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IndividualActions from './individual.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IndividualService } from '../../services/individual.service';

@Injectable()
export class IndividualEffects {
  constructor(private actions$: Actions, private api: IndividualService) {}

  loadIndividuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.loadIndividuals),
      mergeMap(({}) =>
        this.api.getAll().pipe(
          map((response) =>
            IndividualActions.loadIndividualsSuccess({
              items: response.items,
              totalCount: response.totalCount,
            })
          ),
          catchError((error) =>
            of(IndividualActions.loadIndividualsFailure({ error }))
          )
        )
      )
    )
  );

  loadIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.loadIndividual),
      mergeMap(({ id }) =>
        this.api.getById(id).pipe(
          map((individual) =>
            IndividualActions.loadIndividualSuccess({ individual })
          ),
          catchError((error) =>
            of(IndividualActions.loadIndividualFailure({ error }))
          )
        )
      )
    )
  );

  createIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.createIndividual),
      mergeMap(({ payload }) =>
        this.api.create(payload).pipe(
          map((individual) =>
            IndividualActions.createIndividualSuccess({ individual })
          ),
          catchError((error) =>
            of(IndividualActions.createIndividualFailure({ error }))
          )
        )
      )
    )
  );

  updateIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.updateIndividual),
      mergeMap(({ id, changes }) =>
        this.api.update(id, changes).pipe(
          map((individual) =>
            IndividualActions.updateIndividualSuccess({ individual })
          ),
          catchError((error) =>
            of(IndividualActions.updateIndividualFailure({ error }))
          )
        )
      )
    )
  );

  deleteIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.deleteIndividual),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => IndividualActions.deleteIndividualSuccess({ id })),
          catchError((error) =>
            of(IndividualActions.deleteIndividualFailure({ error }))
          )
        )
      )
    )
  );
}
