import { createAction, props } from '@ngrx/store';
import { TeamLeadOfficer } from './team-lead-officer.model';

// Load all
export const loadTeamLeadOfficers = createAction(
  '[TeamLeadOfficers] Load All'
);
export const loadTeamLeadOfficersSuccess = createAction(
  '[TeamLeadOfficers] Load All Success',
  props<{ items: TeamLeadOfficer[]; totalCount: number }>()
);
export const loadTeamLeadOfficersFailure = createAction(
  '[TeamLeadOfficers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadTeamLeadOfficersHistory = createAction(
  '[TeamLeadOfficers] Load History'
);
export const loadTeamLeadOfficersHistorySuccess = createAction(
  '[TeamLeadOfficers] Load History Success',
  props<{ history: TeamLeadOfficer[] }>()
);
export const loadTeamLeadOfficersHistoryFailure = createAction(
  '[TeamLeadOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadTeamLeadOfficer = createAction(
  '[TeamLeadOfficers] Load One',
  props<{ id: number }>()
);
export const loadTeamLeadOfficerSuccess = createAction(
  '[TeamLeadOfficers] Load One Success',
  props<{ team: TeamLeadOfficer }>()
);
export const loadTeamLeadOfficerFailure = createAction(
  '[TeamLeadOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createTeamLeadOfficer = createAction(
  '[TeamLeadOfficers] Create',
  props<{ data: Partial<TeamLeadOfficer> }>()
);
export const createTeamLeadOfficerSuccess = createAction(
  '[TeamLeadOfficers] Create Success',
  props<{ team: TeamLeadOfficer }>()
);
export const createTeamLeadOfficerFailure = createAction(
  '[TeamLeadOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateTeamLeadOfficer = createAction(
  '[TeamLeadOfficers] Update',
  props<{ id: number; data: Partial<TeamLeadOfficer> }>()
);
export const updateTeamLeadOfficerSuccess = createAction(
  '[TeamLeadOfficers] Update Success',
  props<{ team: TeamLeadOfficer }>()
);
export const updateTeamLeadOfficerFailure = createAction(
  '[TeamLeadOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by TeamId
export const loadTeamLeadOfficersByTeamId = createAction(
  '[TeamLeadOfficers] Load By TeamId',
  props<{ teamId: number }>()
);
export const loadTeamLeadOfficersByTeamIdSuccess = createAction(
  '[TeamLeadOfficers] Load By TeamId Success',
  props<{ items: TeamLeadOfficer[] }>()
);
export const loadTeamLeadOfficersByTeamIdFailure = createAction(
  '[TeamLeadOfficers] Load By TeamId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteTeamLeadOfficer = createAction(
  '[TeamLeadOfficers] Delete',
  props<{ id: number; teamId: number }>()
);
export const deleteTeamLeadOfficerSuccess = createAction(
  '[TeamLeadOfficers] Delete Success',
  props<{ id: number; teamId: number }>()
);
export const deleteTeamLeadOfficerFailure = createAction(
  '[TeamLeadOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
