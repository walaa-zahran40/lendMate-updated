import { createReducer, on } from '@ngrx/store';
import * as Actions from './mandate-fees.actions';
import { initialMandateFeesState } from './mandate-fees.state';

export const mandateFeesReducer = createReducer(
  initialMandateFeesState,
  on(Actions.loadMandateFees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadMandateFeesSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadMandateFeesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateFeesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateFeesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadMandateFeesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateFee, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateFeeSuccess, (state, { mandate }) => ({
    ...state,
    current: mandate,
    loading: false,
  })),
  on(Actions.loadMandateFeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createMandateFee, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createMandateFeeSuccess, (state, { mandate }) => ({
    ...state,
    items: [...state.items, mandate],
    loading: false,
  })),
  on(Actions.createMandateFeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateMandateFee, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateMandateFeeSuccess, (state, { mandate }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === mandate.id ? mandate : ct)),
    loading: false,
  })),
  on(Actions.updateMandateFeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteMandateFee, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteMandateFeeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteMandateFeeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadMandateFeesByMandateId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadMandateFeesByMandateIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadMandateFeesByMandateIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
