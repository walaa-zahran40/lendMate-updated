import { createReducer, on } from '@ngrx/store';
import * as Actions from './agreement-registrations.actions';
import { initialAgreementRegistrationsState } from './agreement-registrations.state';

export const agreementRegistrationsReducer = createReducer(
  initialAgreementRegistrationsState,
  on(Actions.loadAgreementRegistrations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadAgreementRegistrationsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadAgreementRegistrationsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementRegistrationsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.loadAgreementRegistrationsHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      loading: false,
    })
  ),
  on(Actions.loadAgreementRegistrationsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementRegistration, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadAgreementRegistrationSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(Actions.loadAgreementRegistrationFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAgreementRegistration, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createAgreementRegistrationSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createAgreementRegistrationFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAgreementRegistration, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateAgreementRegistrationSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateAgreementRegistrationFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAgreementRegistration, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteAgreementRegistrationSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAgreementRegistrationFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadAgreementRegistrationsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadAgreementRegistrationsByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadAgreementRegistrationsByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
