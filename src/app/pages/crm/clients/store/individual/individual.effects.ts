import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as IndividualActions from './individual.actions';
import { CompanyService } from '../../../../../shared/services/company.service';

@Injectable()
export class IndividualEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}

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
