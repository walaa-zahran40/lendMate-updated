import { createReducer, on } from '@ngrx/store';
import * as Actions from './legal-forms.actions';
import { initialLegalFormsState } from './legal-forms.state';

export const legalFormsReducer = createReducer(
  initialLegalFormsState,
  on(Actions.loadLegalForms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadLegalFormsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadLegalFormsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadLegalFormsHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadLegalFormsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadLegalFormsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadLegalForm, (state) => ({ ...state, loading: true })),
  on(Actions.loadLegalFormSuccess, (state, { legalForm }) => ({
    ...state,
    current: legalForm,
    loading: false,
  })),
  on(Actions.loadLegalFormFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createLegalForm, (state) => ({ ...state, loading: true })),
  on(Actions.createLegalFormSuccess, (state, { legalForm }) => ({
    ...state,
    items: [...state.items, legalForm],
    loading: false,
  })),
  on(Actions.createLegalFormFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateLegalForm, (state) => ({ ...state, loading: true })),
  on(Actions.updateLegalFormSuccess, (state, { legalForm }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === legalForm.id ? legalForm : ct
    ),
    loading: false,
  })),
  on(Actions.updateLegalFormFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteLegalForm, (state) => ({ ...state, loading: true })),
  on(Actions.deleteLegalFormSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteLegalFormFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
