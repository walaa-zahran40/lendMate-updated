import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './contact-person.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ContactPersonService } from './contact-person.service';

@Injectable()
export class ContactPersonEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadContactPersons),
      mergeMap(({ page }) =>
        this.service.getAll(page).pipe(
          map((response) => actions.loadContactPersonsSuccess({ response })),
          catchError((error) =>
            of(actions.loadContactPersonsFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadContactPerson),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((contactPerson) =>
            actions.loadContactPersonSuccess({ contactPerson })
          ),
          catchError((error) => of(actions.loadContactPersonFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createContactPerson),
      mergeMap(({ contactPerson }) =>
        this.service.create(contactPerson).pipe(
          map((cp) =>
            actions.createContactPersonSuccess({ contactPerson: cp })
          ),
          catchError((error) =>
            of(actions.createContactPersonFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateContactPerson),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          map((cp) =>
            actions.updateContactPersonSuccess({ contactPerson: cp })
          ),
          catchError((error) =>
            of(actions.updateContactPersonFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteContactPerson),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => actions.deleteContactPersonSuccess({ id })),
          catchError((error) =>
            of(actions.deleteContactPersonFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ContactPersonService
  ) {}
}
