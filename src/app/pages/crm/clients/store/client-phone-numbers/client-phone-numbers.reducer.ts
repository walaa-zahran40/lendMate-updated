import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-phone-numbers.actions';
import { initialClientPhoneNumbersState } from './client-phone-numbers.state';

export const clientPhoneNumberReducer = createReducer(
  initialClientPhoneNumbersState,
  on(Actions.loadClientPhoneNumbers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientPhoneNumbersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadClientPhoneNumbersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientPhoneNumbersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientPhoneNumbersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientPhoneNumbersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientPhoneNumber, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientPhoneNumberSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientPhoneNumberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientPhoneNumber, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientPhoneNumberSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientPhoneNumberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientPhoneNumber, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientPhoneNumberSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientPhoneNumberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientPhoneNumber, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientPhoneNumberSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientPhoneNumberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientPhoneNumbersByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientPhoneNumbersByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadClientPhoneNumbersByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
