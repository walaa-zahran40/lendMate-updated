import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-contact-persons.actions';
import { initialClientContactPersonsState } from './client-contact-persons.state';

export const clientContactPersonsReducer = createReducer(
  initialClientContactPersonsState,
  on(Actions.loadClientContactPersons, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientContactPersonsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadClientContactPersonsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientContactPersonsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientContactPersonsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientContactPersonsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientContactPersonSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientContactPersonSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientContactPersonSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientContactPerson, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientContactPersonSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientContactPersonFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientContactPersonsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientContactPersonsByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadClientContactPersonsByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
