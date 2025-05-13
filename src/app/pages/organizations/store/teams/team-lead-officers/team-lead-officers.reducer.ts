import { createReducer, on } from '@ngrx/store';
import * as Actions from './team-lead-officers.actions';
import { initialTeamLeadOfficersState } from './team-lead-officers.state';

export const teamLeadOfficersReducer = createReducer(
  initialTeamLeadOfficersState,
  on(Actions.loadTeamLeadOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadTeamLeadOfficersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadTeamLeadOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadTeamLeadOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadTeamLeadOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadTeamLeadOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadTeamLeadOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadTeamLeadOfficerSuccess, (state, { team }) => ({
    ...state,
    current: team,
    loading: false,
  })),
  on(Actions.loadTeamLeadOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createTeamLeadOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createTeamLeadOfficerSuccess, (state, { team }) => ({
    ...state,
    items: [...state.items, team],
    loading: false,
  })),
  on(Actions.createTeamLeadOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateTeamLeadOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateTeamLeadOfficerSuccess, (state, { team }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === team.id ? team : ct)),
    loading: false,
  })),
  on(Actions.updateTeamLeadOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteTeamLeadOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteTeamLeadOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteTeamLeadOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadTeamLeadOfficersByTeamId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadTeamLeadOfficersByTeamIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadTeamLeadOfficersByTeamIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
