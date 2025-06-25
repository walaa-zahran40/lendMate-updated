import { createAction, props } from '@ngrx/store';
import { MeetingCalendarItem } from './meeting-calendar-item.model';

export const loadUserCalendar = createAction('[Meetings] Load User Calendar');

export const loadUserCalendarSuccess = createAction(
  '[Meetings] Load User Calendar Success',
  props<{ calendar: MeetingCalendarItem[] }>()
);

export const loadUserCalendarFailure = createAction(
  '[Meetings] Load User Calendar Failure',
  props<{ error: any }>()
);
