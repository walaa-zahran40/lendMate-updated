import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MeetingsActions from './meetings.actions';
import { catchError, map, exhaustMap, of } from 'rxjs';
import { MeetingsService } from './meetings.service';

@Injectable()
export class MeetingsCalendarEffects {
  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.loadUserCalendar),
      exhaustMap(() =>
        this.meetingsService.getUserCalendar().pipe(
          map((calendar) =>
            MeetingsActions.loadUserCalendarSuccess({ calendar })
          ),
          catchError((error) =>
            of(MeetingsActions.loadUserCalendarFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private meetingsService: MeetingsService
  ) {}
}
