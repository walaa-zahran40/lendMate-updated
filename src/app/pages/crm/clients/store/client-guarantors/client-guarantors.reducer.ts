import { createReducer, on } from '@ngrx/store';
import * as GuarantorActions from './client-guarantors.actions';
import { initialGuarantorsState } from './client-guarantors.model';

export const clientGuarantorsReducer = createReducer(
  initialGuarantorsState,
  on(GuarantorActions.loadGuarantors, (state) => ({ ...state, loading: true })),
  on(GuarantorActions.loadGuarantorsSuccess, (state, { guarantors }) => ({
    ...state,
    list: guarantors,
    loading: false,
  })),
  on(GuarantorActions.loadGuarantorsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(GuarantorActions.createGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(GuarantorActions.createGuarantorSuccess, (state, { guarantor }) => ({
    ...state,
    list: [...state.list, guarantor],
    loading: false,
  })),
  on(GuarantorActions.createGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(GuarantorActions.updateGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(GuarantorActions.updateGuarantorSuccess, (state, { guarantor }) => ({
    ...state,
    list: state.list.map((g) => (g.id === guarantor.id ? guarantor : g)),
    loading: false,
  })),
  on(GuarantorActions.updateGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(GuarantorActions.deleteGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(GuarantorActions.deleteGuarantorSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter((g) => g.id !== id),
    loading: false,
  })),
  on(GuarantorActions.deleteGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(GuarantorActions.loadGuarantorsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(GuarantorActions.loadGuarantorsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(GuarantorActions.loadGuarantorsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
