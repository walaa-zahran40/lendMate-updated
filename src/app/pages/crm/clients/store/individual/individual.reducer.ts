import { createReducer, on } from '@ngrx/store';
import * as IndividualActions from './individual.actions';
import { IndividualState } from './individual.state';

export const initialState: IndividualState = {
  selectedIndividual: null,
  individuals: [],
  loading: false,
  error: null,
};

export const individualReducer = createReducer(
  initialState,

  on(IndividualActions.loadIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IndividualActions.loadIndividualSuccess, (state, { individual }) => ({
    ...state,
    selectedIndividual: individual,
  })),
  on(IndividualActions.loadIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(IndividualActions.saveIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IndividualActions.saveIndividualSuccess, (state, { individual }) => ({
    ...state,
    loading: false,
    selectedIndividual: individual,
  })),

  on(IndividualActions.saveIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
