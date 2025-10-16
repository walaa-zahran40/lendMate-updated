import { createAction, props } from '@ngrx/store';
import { RoleClaim } from './role-claim.model';

// Load all
export const loadRoleClaims = createAction('[RoleClaims] Load All');
export const loadRoleClaimsSuccess = createAction(
  '[RoleClaims] Load All Success',
  props<{ items: RoleClaim[]; totalCount: number }>()
);
export const loadRoleClaimsFailure = createAction(
  '[RoleClaims] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadRoleClaimsHistory = createAction('[RoleClaims] Load History');
export const loadRoleClaimsHistorySuccess = createAction(
  '[RoleClaims] Load History Success',
  props<{ history: RoleClaim[] }>()
);
export const loadRoleClaimsHistoryFailure = createAction(
  '[RoleClaims] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadRoleClaim = createAction(
  '[RoleClaims] Load One',
  props<{ id: number }>()
);
export const loadRoleClaimSuccess = createAction(
  '[RoleClaims] Load One Success',
  props<{ role: RoleClaim }>()
);
export const loadRoleClaimFailure = createAction(
  '[RoleClaims] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createRoleClaim = createAction(
  '[RoleClaims] Create',
  props<{ data: Partial<RoleClaim> }>()
);
export const createRoleClaimSuccess = createAction(
  '[RoleClaims] Create Success',
  props<{ role: RoleClaim }>()
);
export const createRoleClaimFailure = createAction(
  '[RoleClaims] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateRoleClaim = createAction(
  '[RoleClaims] Update',
  props<{ id: number; data: Partial<RoleClaim> }>()
);
export const updateRoleClaimSuccess = createAction(
  '[RoleClaims] Update Success',
  props<{ role: RoleClaim }>()
);
export const updateRoleClaimFailure = createAction(
  '[RoleClaims] Update Failure',
  props<{ error: any }>()
);

// Load by RoleId
export const loadRoleClaimsByRoleId = createAction(
  '[RoleClaims] Load By RoleId',
  props<{ roleId: number }>()
);
export const loadRoleClaimsByRoleIdSuccess = createAction(
  '[RoleClaims] Load By RoleId Success',
  props<{ items: any }>()
);
export const loadRoleClaimsByRoleIdFailure = createAction(
  '[RoleClaims] Load By RoleId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteRoleClaim = createAction(
  '[RoleClaims] Delete',
  props<{ id: number; roleId: number }>()
);
export const deleteRoleClaimSuccess = createAction(
  '[RoleClaims] Delete Success',
  props<{ id: number; roleId: number }>()
);
export const deleteRoleClaimFailure = createAction(
  '[RoleClaims] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
