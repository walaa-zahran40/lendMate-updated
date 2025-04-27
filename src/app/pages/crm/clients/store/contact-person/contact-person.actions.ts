import { createAction, props } from '@ngrx/store';
import { ContactPerson, ContactPersonsResponse } from './contact-person.model';

export const loadContactPersons = createAction(
  '[ContactPersons] Load All',
  props<{ page: number }>()
);
export const loadContactPersonsSuccess = createAction(
  '[ContactPersons] Load All Success',
  props<{ response: ContactPersonsResponse }>()
);
export const loadContactPersonsFailure = createAction(
  '[ContactPersons] Load All Failure',
  props<{ error: any }>()
);

export const loadContactPerson = createAction(
  '[ContactPersons] Load One',
  props<{ id: number }>()
);
export const loadContactPersonSuccess = createAction(
  '[ContactPersons] Load One Success',
  props<{ contactPerson: ContactPerson }>()
);
export const loadContactPersonFailure = createAction(
  '[ContactPersons] Load One Failure',
  props<{ error: any }>()
);

export const createContactPerson = createAction(
  '[ContactPersons] Create',
  props<{ contactPerson: Partial<ContactPerson> }>()
);
export const createContactPersonSuccess = createAction(
  '[ContactPersons] Create Success',
  props<{ contactPerson: ContactPerson }>()
);
export const createContactPersonFailure = createAction(
  '[ContactPersons] Create Failure',
  props<{ error: any }>()
);

export const updateContactPerson = createAction(
  '[ContactPersons] Update',
  props<{ id: number; changes: Partial<ContactPerson> }>()
);
export const updateContactPersonSuccess = createAction(
  '[ContactPersons] Update Success',
  props<{ contactPerson: ContactPerson }>()
);
export const updateContactPersonFailure = createAction(
  '[ContactPersons] Update Failure',
  props<{ error: any }>()
);

export const deleteContactPerson = createAction(
  '[ContactPersons] Delete',
  props<{ id: number }>()
);
export const deleteContactPersonSuccess = createAction(
  '[ContactPersons] Delete Success',
  props<{ id: number }>()
);
export const deleteContactPersonFailure = createAction(
  '[ContactPersons] Delete Failure',
  props<{ error: any }>()
);
