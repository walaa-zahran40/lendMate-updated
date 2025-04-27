import { createAction, props } from '@ngrx/store';
import { ClientGuarantor } from './client-guarantors.state';

export const loadGuarantors = createAction(
  '[Client Guarantors] Load Guarantors',
  props<{ clientId: number }>()
);
export const loadGuarantorsSuccess = createAction(
  '[Client Guarantors] Load Guarantors Success',
  props<{ guarantors: ClientGuarantor[] }>()
);
export const loadGuarantorsFailure = createAction(
  '[Client Guarantors] Load Guarantors Failure',
  props<{ error: any }>()
);

export const createGuarantor = createAction(
  '[Client Guarantors] Create Guarantor',
  props<{ guarantor: ClientGuarantor }>()
);
export const createGuarantorSuccess = createAction(
  '[Client Guarantors] Create Guarantor Success',
  props<{ guarantor: ClientGuarantor }>()
);
export const createGuarantorFailure = createAction(
  '[Client Guarantors] Create Guarantor Failure',
  props<{ error: any }>()
);

export const updateGuarantor = createAction(
  '[Client Guarantors] Update Guarantor',
  props<{ id: number; guarantor: ClientGuarantor }>()
);
export const updateGuarantorSuccess = createAction(
  '[Client Guarantors] Update Guarantor Success',
  props<{ guarantor: ClientGuarantor }>()
);
export const updateGuarantorFailure = createAction(
  '[Client Guarantors] Update Guarantor Failure',
  props<{ error: any }>()
);

export const deleteGuarantor = createAction(
  '[Client Guarantors] Delete Guarantor',
  props<{ id: number }>()
);
export const deleteGuarantorSuccess = createAction(
  '[Client Guarantors] Delete Guarantor Success',
  props<{ id: number }>()
);
export const deleteGuarantorFailure = createAction(
  '[Client Guarantors] Delete Guarantor Failure',
  props<{ error: any }>()
);

export const loadGuarantorsHistory = createAction(
  '[Client Guarantors] Load Guarantors History'
);
export const loadGuarantorsHistorySuccess = createAction(
  '[Client Guarantors] Load Guarantors History Success',
  props<{ history: any[] }>()
);
export const loadGuarantorsHistoryFailure = createAction(
  '[Client Guarantors] Load Guarantors History Failure',
  props<{ error: any }>()
);
