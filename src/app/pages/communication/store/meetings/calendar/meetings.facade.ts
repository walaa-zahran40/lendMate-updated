import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MeetingsActions from './meetings.actions';
import * as MeetingsSelectors from './meetings.selectors';
import { Observable } from 'rxjs';
import { MeetingCalendarItem } from './meeting-calendar-item.model';

@Injectable({ providedIn: 'root' })
export class MeetingsFacade {
  calendar$: Observable<MeetingCalendarItem[]> = this.store.select(
    MeetingsSelectors.selectUserCalendar
  );

  constructor(private store: Store) {}

  loadUserCalendar() {
    this.store.dispatch(MeetingsActions.loadUserCalendar());
  }
}
