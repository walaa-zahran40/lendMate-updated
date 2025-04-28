import { createReducer, on } from '@ngrx/store';
import * as LegalFormActions from './legal-form.actions';
import { LegalForm } from '../../interfaces/legal-form.interface';

// State interface
export interface LegalFormState {
  legalForms: LegalForm[];
  loading: boolean;
  error: any;
}

// Initial state
export const initialLegalFormState: LegalFormState = {
  legalForms: [],
  loading: false,
  error: null,
};

// Reducer function
export const legalFormReducer = createReducer(
  initialLegalFormState,

  // Load request
  on(LegalFormActions.loadLegalForms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Load success
  on(LegalFormActions.loadLegalFormsSuccess, (state, { legalForms }) => ({
    ...state,
    legalForms,
    loading: false,
  })),

  // Load failure
  on(LegalFormActions.loadLegalFormsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
