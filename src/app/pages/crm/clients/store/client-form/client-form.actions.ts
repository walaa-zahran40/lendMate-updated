import { createAction, props } from '@ngrx/store';

export const confirmLeave = createAction('[ClientForm] Confirm Leave');
export const confirmLeave2 = createAction('[ClientForm] Confirm Leave 2');

export const leaveConfirmed = createAction('[ClientForm] Leave Confirmed');
export const leaveCanceled = createAction('[ClientForm] Leave Canceled');
export const leaveConfirmed2 = createAction('[ClientForm] Leave Confirmed');
export const leaveCanceled2 = createAction('[ClientForm] Leave Canceled');

// (optional) track dirty state if you want to only confirm when the form is dirty:
export const setFormDirty = createAction(
  '[ClientForm] Set Dirty',
  props<{ dirty: boolean }>()
);
