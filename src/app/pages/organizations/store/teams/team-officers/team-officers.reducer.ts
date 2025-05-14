import { createReducer, on } from '@ngrx/store';
import * as Actions from './team-officers.actions';
import { initialTeamOfficersState } from './team-officers.state';

export const teamOfficersReducer = createReducer(
  initialTeamOfficersState,
  on(Actions.loadTeamOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadTeamOfficersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadTeamOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadTeamOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadTeamOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadTeamOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadTeamOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadTeamOfficerSuccess, (state, { team }) => ({
    ...state,
    current: team,
    loading: false,
  })),
  on(Actions.loadTeamOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createTeamOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createTeamOfficerSuccess, (state, { team }) => ({
    ...state,
    items: [...state.items, team],
    loading: false,
  })),
  on(Actions.createTeamOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateTeamOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateTeamOfficerSuccess, (state, { team }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === team.id ? team : ct)),
    loading: false,
  })),
  on(Actions.updateTeamOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteTeamOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteTeamOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteTeamOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadTeamOfficersByTeamId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadTeamOfficersByTeamIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadTeamOfficersByTeamIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
