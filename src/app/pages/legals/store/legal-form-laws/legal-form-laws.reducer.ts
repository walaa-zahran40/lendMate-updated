import { createReducer, on } from '@ngrx/store';
import * as Actions from './legal-form-laws.actions';
import { initialLegalFormLawsState } from './legal-form-laws.state';

export const legalFormLawsReducer = createReducer(
  initialLegalFormLawsState,
  on(Actions.loadLegalFormLaws, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadLegalFormLawsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadLegalFormLawsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadLegalFormLawsHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadLegalFormLawsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadLegalFormLawsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadLegalFormLaw, (state) => ({ ...state, loading: true })),
  on(Actions.loadLegalFormLawSuccess, (state, { legalFormLaw }) => ({
    ...state,
    current: legalFormLaw,
    loading: false,
  })),
  on(Actions.loadLegalFormLawFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createLegalFormLaw, (state) => ({ ...state, loading: true })),
  on(Actions.createLegalFormLawSuccess, (state, { legalFormLaw }) => ({
    ...state,
    items: [...state.items, legalFormLaw],
    loading: false,
  })),
  on(Actions.createLegalFormLawFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateLegalFormLaw, (state) => ({ ...state, loading: true })),
  on(Actions.updateLegalFormLawSuccess, (state, { legalFormLaw }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === legalFormLaw.id ? legalFormLaw : ct
    ),
    loading: false,
  })),
  on(Actions.updateLegalFormLawFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteLegalFormLaw, (state) => ({ ...state, loading: true })),
  on(Actions.deleteLegalFormLawSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteLegalFormLawFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
