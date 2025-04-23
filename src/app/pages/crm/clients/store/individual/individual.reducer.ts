// individual.reducer.ts
import { createReducer, on, Action } from '@ngrx/store';
import * as IndividualActions from './individual.actions';
import { IndividualState, initialIndividualState } from './individual.state';

const _individualReducer = createReducer(
  initialIndividualState,

  // load all
  on(IndividualActions.loadIndividuals, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    IndividualActions.loadIndividualsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      loading: false,
      individuals: items,
      totalCount,
    })
  ),
  on(IndividualActions.loadIndividualsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // load one
  on(IndividualActions.loadIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.loadIndividualSuccess, (state, { individual }) => ({
    ...state,
    loading: false,
    selectedIndividual: individual,
  })),
  on(IndividualActions.loadIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // create
  on(IndividualActions.createIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.createIndividualSuccess, (state, { individual }) => ({
    ...state,
    loading: false,
    individuals: [individual, ...state.individuals],
    totalCount: state.totalCount + 1,
  })),
  on(IndividualActions.createIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(IndividualActions.updateIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.updateIndividualSuccess, (state, { individual }) => ({
    ...state,
    loading: false,
    individuals: state.individuals.map((i) =>
      i.id === individual.id ? individual : i
    ),
    selectedIndividual: individual,
  })),
  on(IndividualActions.updateIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(IndividualActions.deleteIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.deleteIndividualSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    individuals: state.individuals.filter((i) => i.id !== id),
    totalCount: state.totalCount - 1,
  })),
  on(IndividualActions.deleteIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function individualReducer(
  state: IndividualState | undefined,
  action: Action
) {
  return _individualReducer(state, action);
}
