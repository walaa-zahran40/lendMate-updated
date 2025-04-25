import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IndividualActions from './individual.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { IndividualService } from './individual.service';

@Injectable()
export class IndividualEffects {
  constructor(
    private actions$: Actions,
    private api: IndividualService,
    private router: Router
  ) {}

  loadIndividuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.loadIndividuals),
      mergeMap(() =>
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
      ),
      tap(() => this.router.navigate(['/crm/clients/view-clients']))
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
      ),
      tap(() => this.router.navigate(['/crm/clients/view-clients']))
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
