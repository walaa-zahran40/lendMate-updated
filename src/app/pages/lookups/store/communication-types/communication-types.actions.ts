import { createAction, props } from '@ngrx/store';
import { CommunicationType } from './communication-type.model';

export const loadAll = createAction(
  '[CommunicationTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[CommunicationTypes] Load All Success',
  props<{ result: CommunicationType[] }>()
);

export const loadAllFailure = createAction(
  '[CommunicationTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[CommunicationTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[CommunicationTypes] Load By Id Success',
  props<{ entity: CommunicationType }>()
);
export const loadByIdFailure = createAction(
  '[CommunicationTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[CommunicationTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<CommunicationType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[CommunicationTypes] Create Success',
  props<{ entity: CommunicationType }>()
);
export const createEntityFailure = createAction(
  '[CommunicationTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[CommunicationTypes] Update',
  props<{ id: number; changes: Partial<CommunicationType> }>()
);
export const updateEntitySuccess = createAction(
  '[CommunicationTypes] Update Success',
  props<{ id: number; changes: Partial<CommunicationType> }>()
);
export const updateEntityFailure = createAction(
  '[CommunicationTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[CommunicationTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[CommunicationTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[CommunicationTypes] Delete Failure',
  props<{ error: any }>()
);
