// src/app/pages/crm/clients/store/client-form/client-form.reducer.ts

import { createReducer, on } from '@ngrx/store';
import {
  setFormDirty,
  leaveConfirmed,
  leaveConfirmed2,
} from './client-form.actions';

export interface State {
  dirty: boolean;
}

export const initialState: State = {
  dirty: false,
};

export const clientFormReducer = createReducer(
  initialState,

  // Update the dirty flag when the form changes
  on(setFormDirty, (state, { dirty }) => ({
    ...state,
    dirty,
  })),

  // After leave is confirmed, reset dirty to false
  on(leaveConfirmed, (state) => ({
    ...state,
    dirty: false,
  })),
  on(leaveConfirmed2, (state) => ({
    ...state,
    dirty: false,
  }))
);
