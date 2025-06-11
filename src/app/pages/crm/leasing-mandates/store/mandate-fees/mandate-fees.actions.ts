import { createAction, props } from '@ngrx/store';
import { MandateFee } from './mandate-fee.model';

export const loadAll = createAction(
  '[MandateFees] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandateFees] Load All Success',
  props<{ result: MandateFee[] }>()
);

export const loadAllFailure = createAction(
  '[MandateFees] Load All Failure',
  props<{ error: any }>()
);
export const createMandateFee = createAction(
  '[MandateFee] Create',
  props<{ payload: Partial<MandateFee> }>()
);

export const createMandateFeeSuccess = createAction(
  '[MandateFee] Create Success',
  props<{ mandateAdditionalTerm: MandateFee }>()
);

export const createMandateFeeFailure = createAction(
  '[MandateFee] Create Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandateFees] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Mandate Additional Term] Load By Id Success',
  props<{ entities: MandateFee[] }>() // <- changed from `{ entity }`
);

export const loadByIdFailure = createAction(
  '[MandateFees] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandateFees] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateFee, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandateFees] Create Success',
  props<{ entity: MandateFee }>()
);
export const createEntityFailure = createAction(
  '[MandateFees] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandateFees] Update',
  props<{ id: number; changes: Partial<MandateFee> }>()
);
export const updateEntitySuccess = createAction(
  '[MandateFees] Update Success',
  props<{ id: number; changes: Partial<MandateFee> }>()
);
export const updateEntityFailure = createAction(
  '[MandateFees] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandateFees] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandateFees] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandateFees] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedMandateFee = createAction(
  '[MandateFees] Clear Selected'
);
