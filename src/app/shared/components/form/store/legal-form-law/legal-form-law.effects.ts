import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LegalFormLawActions from './legal-form-law.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LegalFormLawService } from '../../../../services/legal-form-law.service';

@Injectable()
export class LegalFormLawEffects {
  constructor(
    private actions$: Actions,
    private legalFormLawService: LegalFormLawService
  ) {}

  loadLegalFormLaws$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalFormLawActions.loadLegalFormLaws),
      switchMap(() =>
        this.legalFormLawService.getAllLegalFormLaws().pipe(
          map((res: any) =>
            LegalFormLawActions.loadLegalFormLawsSuccess({
              legalFormLaws: res.items,
            })
          ),
          catchError((error) =>
            of(LegalFormLawActions.loadLegalFormLawsFailure({ error }))
          )
        )
      )
    )
  );
}
