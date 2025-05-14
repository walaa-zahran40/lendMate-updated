import { createAction, props } from '@ngrx/store';
import { TeamOfficer } from './team-officer.model';

// Load all
export const loadTeamOfficers = createAction(
  '[TeamOfficers] Load All'
);
export const loadTeamOfficersSuccess = createAction(
  '[TeamOfficers] Load All Success',
  props<{ items: TeamOfficer[]; totalCount: number }>()
);
export const loadTeamOfficersFailure = createAction(
  '[TeamOfficers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadTeamOfficersHistory = createAction(
  '[TeamOfficers] Load History'
);
export const loadTeamOfficersHistorySuccess = createAction(
  '[TeamOfficers] Load History Success',
  props<{ history: TeamOfficer[] }>()
);
export const loadTeamOfficersHistoryFailure = createAction(
  '[TeamOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadTeamOfficer = createAction(
  '[TeamOfficers] Load One',
  props<{ id: number }>()
);
export const loadTeamOfficerSuccess = createAction(
  '[TeamOfficers] Load One Success',
  props<{ team: TeamOfficer }>()
);
export const loadTeamOfficerFailure = createAction(
  '[TeamOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createTeamOfficer = createAction(
  '[TeamOfficers] Create',
  props<{ data: Partial<TeamOfficer> }>()
);
export const createTeamOfficerSuccess = createAction(
  '[TeamOfficers] Create Success',
  props<{ team: TeamOfficer }>()
);
export const createTeamOfficerFailure = createAction(
  '[TeamOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateTeamOfficer = createAction(
  '[TeamOfficers] Update',
  props<{ id: number; data: Partial<TeamOfficer> }>()
);
export const updateTeamOfficerSuccess = createAction(
  '[TeamOfficers] Update Success',
  props<{ team: TeamOfficer }>()
);
export const updateTeamOfficerFailure = createAction(
  '[TeamOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by TeamId
export const loadTeamOfficersByTeamId = createAction(
  '[TeamOfficers] Load By TeamId',
  props<{ teamId: number }>()
);
export const loadTeamOfficersByTeamIdSuccess = createAction(
  '[TeamOfficers] Load By TeamId Success',
  props<{ items: TeamOfficer[] }>()
);
export const loadTeamOfficersByTeamIdFailure = createAction(
  '[TeamOfficers] Load By TeamId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteTeamOfficer = createAction(
  '[TeamOfficers] Delete',
  props<{ id: number; teamId: number }>()
);
export const deleteTeamOfficerSuccess = createAction(
  '[TeamOfficers] Delete Success',
  props<{ id: number; teamId: number }>()
);
export const deleteTeamOfficerFailure = createAction(
  '[TeamOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
