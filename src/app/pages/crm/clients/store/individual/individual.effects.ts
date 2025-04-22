import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IndividualActions from './individual.actions';

@Injectable()
export class IndividualEffects {
  constructor(private actions$: Actions) {}

  loadIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.loadIndividual)
      // switchMap(({ id }) =>
      //   this.companyService.getIndividual(id).pipe(
      //     map((individual) =>
      //       IndividualActions.loadIndividualSuccess({ individual })
      //     ),
      //     catchError((error) =>
      //       of(IndividualActions.loadIndividualFailure({ error }))
      //     )
      //   )
      // )
    )
  );

  saveIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualActions.saveIndividual)
      // mergeMap(({ individual }) => {
      //   const request$ = individual.id
      //     ? this.companyService.updateClientIndividualBusinessDetails(
      //         individual.id,
      //         individual
      //       )
      //     : this.companyService.createClientIndividualBusinessDetails(
      //         individual
      //       );

      //   return request$.pipe(
      //     map((saved) =>
      //       IndividualActions.saveIndividualSuccess({ individual: saved })
      //     ),
      //     catchError((error) =>
      //       of(IndividualActions.saveIndividualFailure({ error }))
      //     )
      //   );
      // })
    )
  );
}
