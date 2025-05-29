import { createReducer, on } from '@ngrx/store';
import * as Actions from './mandate-additional-terms.actions';
import { initialMandateAdditionalTermsState } from './mandate-additional-terms.state';

export const mandateAdditionalTermReducer = createReducer(
  initialMandateAdditionalTermsState,
  on(Actions.loadMandateAdditionalTerms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadMandateAdditionalTermsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadMandateAdditionalTermsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateAdditionalTermsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateAdditionalTermsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadMandateAdditionalTermsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateAdditionalTerm, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateAdditionalTermSuccess, (state, { mandate }) => ({
    ...state,
    current: mandate,
    loading: false,
  })),
  on(Actions.loadMandateAdditionalTermFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createMandateAdditionalTerm, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createMandateAdditionalTermSuccess, (state, { mandate }) => ({
    ...state,
    items: [...state.items, mandate],
    loading: false,
  })),
  on(Actions.createMandateAdditionalTermFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateMandateAdditionalTerm, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateMandateAdditionalTermSuccess, (state, { mandate }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === mandate.id ? mandate : ct)),
    loading: false,
  })),
  on(Actions.updateMandateAdditionalTermFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteMandateAdditionalTerm, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteMandateAdditionalTermSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteMandateAdditionalTermFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadMandateAdditionalTermsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadMandateAdditionalTermsByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadMandateAdditionalTermsByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
