import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-sales-turnovers.actions';
import { initialClientSalesTurnoversState } from './client-sales-turnovers.state';

export const clientSalesTurnoverReducer = createReducer(
  initialClientSalesTurnoversState,
  on(Actions.loadClientSalesTurnovers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientSalesTurnoversSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadClientSalesTurnoversFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientSalesTurnoversHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientSalesTurnoversHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientSalesTurnoversHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientSalesTurnover, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientSalesTurnoverSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientSalesTurnoverFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientSalesTurnover, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientSalesTurnoverSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientSalesTurnoverFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientSalesTurnover, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientSalesTurnoverSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientSalesTurnoverFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientSalesTurnover, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientSalesTurnoverSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientSalesTurnoverFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientSalesTurnoversByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientSalesTurnoversByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadClientSalesTurnoversByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
