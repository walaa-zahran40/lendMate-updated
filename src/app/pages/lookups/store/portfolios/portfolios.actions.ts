import { createAction, props } from '@ngrx/store';
import { Portfolio } from './portfolio.model';

export const loadAll = createAction(
  '[Portfolios] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Portfolios] Load All Success',
  props<{ result: Portfolio[] }>()
);

export const loadAllFailure = createAction(
  '[Portfolios] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Portfolios] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Portfolios] Load By Id Success',
  props<{ entity: Portfolio }>()
);
export const loadByIdFailure = createAction(
  '[Portfolios] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Portfolios] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Portfolio, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Portfolios] Create Success',
  props<{ entity: Portfolio }>()
);
export const createEntityFailure = createAction(
  '[Portfolios] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Portfolios] Update',
  props<{ id: number; changes: Partial<Portfolio> }>()
);
export const updateEntitySuccess = createAction(
  '[Portfolios] Update Success',
  props<{ id: number; changes: Partial<Portfolio> }>()
);
export const updateEntityFailure = createAction(
  '[Portfolios] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Portfolios] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Portfolios] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Portfolios] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPortfolioHistory = createAction(
  '[Portfolio/API] Load Address Type History'
);

export const loadPortfolioHistorySuccess = createAction(
  '[Portfolio/API] Load Address Type History Success',
  props<{ history: Portfolio[] }>()
);

export const loadPortfolioHistoryFailure = createAction(
  '[Portfolio/API] Load Address Type History Failure',
  props<{ error: any }>()
);
