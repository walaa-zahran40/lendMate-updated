import { createAction, props } from '@ngrx/store';
import {
  ClientCentralBank,
  ClientCentralBankHistory,
  PagedResultDto,
} from './client-central-bank.model';

// Load all
export const loadAll = createAction(
  '[ClientCentralBank] Load All',
  props<{ page: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientCentralBank] Load All Success',
  props<{ result: PagedResultDto<ClientCentralBank> }>()
);
export const loadAllFailure = createAction(
  '[ClientCentralBank] Load All Failure',
  props<{ error: string }>()
);

// Load one
export const loadOne = createAction(
  '[ClientCentralBank] Load One',
  props<{ id: number }>()
);
export const loadOneSuccess = createAction(
  '[ClientCentralBank] Load One Success',
  props<{ entity: ClientCentralBank }>()
);
export const loadOneFailure = createAction(
  '[ClientCentralBank] Load One Failure',
  props<{ error: string }>()
);

// Create
export const createEntity = createAction(
  '[ClientCentralBank] Create',
  props<{ payload: Partial<ClientCentralBank> }>()
);
export const createSuccess = createAction(
  '[ClientCentralBank] Create Success',
  props<{ entity: ClientCentralBank }>()
);
export const createFailure = createAction(
  '[ClientCentralBank] Create Failure',
  props<{ error: string }>()
);

// Update
export const updateEntity = createAction(
  '[ClientCentralBank] Update',
  props<{ id: number; changes: Partial<ClientCentralBank> }>()
);
export const updateSuccess = createAction(
  '[ClientCentralBank] Update Success',
  props<{ entity: ClientCentralBank }>()
);
export const updateFailure = createAction(
  '[ClientCentralBank] Update Failure',
  props<{ error: string }>()
);

// Delete
export const deleteEntity = createAction(
  '[ClientCentralBank] Delete',
  props<{ id: number }>()
);
export const deleteSuccess = createAction(
  '[ClientCentralBank] Delete Success',
  props<{ id: number }>()
);
export const deleteFailure = createAction(
  '[ClientCentralBank] Delete Failure',
  props<{ error: string }>()
);

// Load history
export const loadHistory = createAction(
  '[ClientCentralBank] Load History',
  props<{ clientId: number }>()
);
export const loadHistorySuccess = createAction(
  '[ClientCentralBank] Load History Success',
  props<{ history: ClientCentralBankHistory[] }>()
);
export const loadHistoryFailure = createAction(
  '[ClientCentralBank] Load History Failure',
  props<{ error: string }>()
);
