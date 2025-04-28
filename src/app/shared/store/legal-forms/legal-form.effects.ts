import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadLegalForms,
  loadLegalFormsSuccess,
  loadLegalFormsFailure,
} from './legal-form.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LegalFormService } from '../../../pages/crm/clients/services/legal-form.service';

@Injectable()
export class LegalFormEffects {
  constructor(
    private actions$: Actions,
    private legalFormService: LegalFormService
  ) {}

  loadLegalForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLegalForms),
      switchMap(() =>
        this.legalFormService.getAllLegalForms().pipe(
          map((res: any) => loadLegalFormsSuccess({ legalForms: res.items })),
          catchError((error) => of(loadLegalFormsFailure({ error })))
        )
      )
    )
  );
}
