import { createAction, props } from '@ngrx/store';
import { MandateAdditionalTerm } from './client-mandate-additional-term.model';

export const loadAll = createAction(
  '[MandateAdditionalTerms] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandateAdditionalTerms] Load All Success',
  props<{ result: MandateAdditionalTerm[] }>()
);

export const loadAllFailure = createAction(
  '[MandateAdditionalTerms] Load All Failure',
  props<{ error: any }>()
);
export const createMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerm] Create',
  props<{ payload: Partial<MandateAdditionalTerm> }>()
);

export const createMandateAdditionalTermSuccess = createAction(
  '[MandateAdditionalTerm] Create Success',
  props<{ mandateAdditionalTerm: MandateAdditionalTerm }>()
);

export const createMandateAdditionalTermFailure = createAction(
  '[MandateAdditionalTerm] Create Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandateAdditionalTerms] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Mandate Additional Term] Load By Id Success',
  props<{ entities: MandateAdditionalTerm[] }>() // <- changed from `{ entity }`
);

export const loadByIdFailure = createAction(
  '[MandateAdditionalTerms] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandateAdditionalTerms] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateAdditionalTerm, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandateAdditionalTerms] Create Success',
  props<{ entity: MandateAdditionalTerm }>()
);
export const createEntityFailure = createAction(
  '[MandateAdditionalTerms] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandateAdditionalTerms] Update',
  props<{ id: number; changes: Partial<MandateAdditionalTerm> }>()
);
export const updateEntitySuccess = createAction(
  '[MandateAdditionalTerms] Update Success',
  props<{ id: number; changes: Partial<MandateAdditionalTerm> }>()
);
export const updateEntityFailure = createAction(
  '[MandateAdditionalTerms] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandateAdditionalTerms] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandateAdditionalTerms] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandateAdditionalTerms] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerms] Clear Selected'
);
// ─── Fetch one “additional term” by its own ID ─────────────────────────────
export const loadByAdditionalId = createAction(
  '[MandateAdditionalTerms] Load By Additional-Term Id',
  props<{ id: number }>()
);
export const loadByAdditionalIdSuccess = createAction(
  '[MandateAdditionalTerms] Load By Additional-Term Id Success',
  props<{ entity: MandateAdditionalTerm }>()
);
export const loadByAdditionalIdFailure = createAction(
  '[MandateAdditionalTerms] Load By Additional-Term Id Failure',
  props<{ error: any }>()
);
