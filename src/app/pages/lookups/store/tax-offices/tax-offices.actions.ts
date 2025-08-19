import { createAction, props } from '@ngrx/store';
import { TaxOffice } from './tax-office.model';

export const loadAll = createAction(
  '[TaxOffices] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[TaxOffices] Load All Success',
  props<{ result: TaxOffice[] }>()
);

export const loadAllFailure = createAction(
  '[TaxOffices] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[TaxOffices] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[TaxOffices] Load By Id Success',
  props<{ entity: TaxOffice }>()
);
export const loadByIdFailure = createAction(
  '[TaxOffices] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[TaxOffices] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<TaxOffice, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[TaxOffices] Create Success',
  props<{ entity: TaxOffice }>()
);
export const createEntityFailure = createAction(
  '[TaxOffices] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[TaxOffices] Update',
  props<{ id: number; changes: Partial<TaxOffice> }>()
);
export const updateEntitySuccess = createAction(
  '[TaxOffices] Update Success',
  props<{ id: number; changes: Partial<TaxOffice> }>()
);
export const updateEntityFailure = createAction(
  '[TaxOffices] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[TaxOffices] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[TaxOffices] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[TaxOffices] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadTaxOfficeHistory = createAction(
  '[TaxOffice/API] Load TaxOffice History'
);

export const loadTaxOfficeHistorySuccess = createAction(
  '[TaxOffice/API] Load TaxOffice History Success',
  props<{ history: TaxOffice[] }>()
);

export const loadTaxOfficeHistoryFailure = createAction(
  '[TaxOffice/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
