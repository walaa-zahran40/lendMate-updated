import { createReducer, on } from '@ngrx/store';
import * as LegalFormLawActions from './legal-form-law.actions';
import { LegalFormLaw } from '../../../../../shared/interfaces/legal-form-law.interface';

export interface LegalFormLawState {
  legalFormLaws: LegalFormLaw[];
  loading: boolean;
  error: any;
}

export const initialLegalFormLawState: LegalFormLawState = {
  legalFormLaws: [],
  loading: false,
  error: null,
};

export const legalFormLawReducer = createReducer(
  initialLegalFormLawState,

  on(LegalFormLawActions.loadLegalFormLaws, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    LegalFormLawActions.loadLegalFormLawsSuccess,
    (state, { legalFormLaws }) => ({
      ...state,
      legalFormLaws,
      loading: false,
    })
  ),

  on(LegalFormLawActions.loadLegalFormLawsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
