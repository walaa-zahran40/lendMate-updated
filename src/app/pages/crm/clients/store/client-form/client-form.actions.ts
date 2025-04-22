import { createAction, props } from '@ngrx/store';

export const confirmLeave = createAction('[ClientForm] Confirm Leave');
export const leaveConfirmed = createAction('[ClientForm] Leave Confirmed');
export const leaveCanceled = createAction('[ClientForm] Leave Canceled');

// (optional) track dirty state if you want to only confirm when the form is dirty:
export const setFormDirty = createAction(
  '[ClientForm] Set Dirty',
  props<{ dirty: boolean }>()
);
