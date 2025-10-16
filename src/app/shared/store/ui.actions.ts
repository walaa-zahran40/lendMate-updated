import { createAction } from '@ngrx/store';

export const confirmLeave = createAction('[UI] Confirm Leave');
export const leaveConfirmed = createAction('[UI] Leave Confirmed');
export const leaveCanceled = createAction('[UI] Leave Canceled');
