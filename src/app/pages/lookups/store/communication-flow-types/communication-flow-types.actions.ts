import { createAction, props } from '@ngrx/store';
import { CommunicationFlowType } from './communication-flow-type.model';

export const loadAll = createAction(
  '[CommunicationFlowTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[CommunicationFlowTypes] Load All Success',
  props<{ result: CommunicationFlowType[] }>()
);

export const loadAllFailure = createAction(
  '[CommunicationFlowTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[CommunicationFlowTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[CommunicationFlowTypes] Load By Id Success',
  props<{ entity: CommunicationFlowType }>()
);
export const loadByIdFailure = createAction(
  '[CommunicationFlowTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[CommunicationFlowTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<CommunicationFlowType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[CommunicationFlowTypes] Create Success',
  props<{ entity: CommunicationFlowType }>()
);
export const createEntityFailure = createAction(
  '[CommunicationFlowTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[CommunicationFlowTypes] Update',
  props<{ id: number; changes: Partial<CommunicationFlowType> }>()
);
export const updateEntitySuccess = createAction(
  '[CommunicationFlowTypes] Update Success',
  props<{ id: number; changes: Partial<CommunicationFlowType> }>()
);
export const updateEntityFailure = createAction(
  '[CommunicationFlowTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[CommunicationFlowTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[CommunicationFlowTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[CommunicationFlowTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
