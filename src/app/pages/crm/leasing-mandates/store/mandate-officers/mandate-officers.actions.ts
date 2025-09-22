import { createAction, props } from '@ngrx/store';
import { MandateOfficer } from './mandate-officer.model';

export const loadAll = createAction(
  '[MandateOfficers] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandateOfficers] Load All Success',
  props<{ result: MandateOfficer[] }>()
);

export const loadAllFailure = createAction(
  '[MandateOfficers] Load All Failure',
  props<{ error: any }>()
);
export const createMandateOfficer = createAction(
  '[MandateOfficer] Create',
  props<{ payload: Partial<MandateOfficer> }>()
);

export const createMandateOfficerSuccess = createAction(
  '[MandateOfficer] Create Success',
  props<{ mandateOMandateOfficer: MandateOfficer }>()
);

export const createMandateOfficerFailure = createAction(
  '[MandateOfficer] Create Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandateOfficers] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Mandate Additional Term] Load By Id Success',
  props<{ entities: MandateOfficer[] }>() // <- changed from `{ entity }`
);

export const loadByIdFailure = createAction(
  '[MandateOfficers] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandateOfficers] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateOfficer, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandateOfficers] Create Success',
  props<{ entity: MandateOfficer }>()
);
export const createEntityFailure = createAction(
  '[MandateOfficers] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandateOfficers] Update',
  props<{ id: number; changes: Partial<MandateOfficer> }>()
);
export const updateEntitySuccess = createAction(
  '[MandateOfficers] Update Success',
  props<{ id: number; changes: Partial<MandateOfficer> }>()
);
export const updateEntityFailure = createAction(
  '[MandateOfficers] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandateOfficers] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandateOfficers] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandateOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedMandateOfficer = createAction(
  '[MandateOfficers] Clear Selected'
);
