import { createReducer, on } from '@ngrx/store';
import * as MeetingsActions from './meetings.actions';
import { MeetingCalendarItem } from './meeting-calendar-item.model';

export interface State {
  calendar: MeetingCalendarItem[];
}

export const initialState: State = {
  calendar: [],
};

export const meetingsCalendarReducer = createReducer(
  initialState,
  on(MeetingsActions.loadUserCalendarSuccess, (state, { calendar }) => ({
    ...state,
    calendar,
  }))
);
