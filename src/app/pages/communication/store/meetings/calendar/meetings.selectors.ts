import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './meetings.reducer';

const selectMeetingsState = createFeatureSelector<State>('meetingsCalendar');

export const selectUserCalendar = createSelector(
  selectMeetingsState,
  (s) => s.calendar
);
