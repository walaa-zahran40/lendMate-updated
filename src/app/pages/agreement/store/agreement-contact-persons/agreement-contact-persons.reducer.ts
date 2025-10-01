import { createReducer, on } from '@ngrx/store';
import * as Actions from './agreement-contact-persons.actions';
import { initialAgreementContactPersonsState } from './agreement-contact-persons.state';

export const agreementContactPersonsReducer = createReducer(
  initialAgreementContactPersonsState,
  on(Actions.loadAgreementContactPersons, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadAgreementContactPersonsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadAgreementContactPersonsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementContactPersonsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.loadAgreementContactPersonsHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      loading: false,
    })
  ),
  on(Actions.loadAgreementContactPersonsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.loadAgreementContactPersonSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
      error: null,
    })
  ),
  on(Actions.loadAgreementContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAgreementContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createAgreementContactPersonSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createAgreementContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAgreementContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateAgreementContactPersonSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateAgreementContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAgreementContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteAgreementContactPersonSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAgreementContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadAgreementContactPersonsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadAgreementContactPersonsByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadAgreementContactPersonsByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
