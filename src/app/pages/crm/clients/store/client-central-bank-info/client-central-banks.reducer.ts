import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-central-banks.actions';
import { initialClientCentralBankInfoState } from './client-central-banks.state';

export const clientCentralBankInfoReducer = createReducer(
  initialClientCentralBankInfoState,
  on(Actions.loadAllClientCentralBankInfo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadAllClientCentralBankInfoSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadAllClientCentralBankInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientCentralBankInfoHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientCentralBankInfoHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientCentralBankInfoHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientCentralBankInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientCentralBankInfoSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientCentralBankInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientCentralBankInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientCentralBankInfoSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientCentralBankInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientCentralBankInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientCentralBankInfoSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientCentralBankInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientCentralBankInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientCentralBankInfoSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientCentralBankInfoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientCentralBankInfoByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientCentralBankInfoByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadClientCentralBankInfoByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
