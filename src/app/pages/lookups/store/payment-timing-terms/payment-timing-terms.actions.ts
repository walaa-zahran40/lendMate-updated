import { createAction, props } from '@ngrx/store';
import { PaymentTimingTerm } from './payment-timing-term.model';

export const loadAll = createAction(
  '[PaymentTimingTerms] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PaymentTimingTerms] Load All Success',
  props<{ result: PaymentTimingTerm[] }>()
);

export const loadAllFailure = createAction(
  '[PaymentTimingTerms] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PaymentTimingTerms] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PaymentTimingTerms] Load By Id Success',
  props<{ entity: PaymentTimingTerm }>()
);
export const loadByIdFailure = createAction(
  '[PaymentTimingTerms] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PaymentTimingTerms] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PaymentTimingTerm, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PaymentTimingTerms] Create Success',
  props<{ entity: PaymentTimingTerm }>()
);
export const createEntityFailure = createAction(
  '[PaymentTimingTerms] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PaymentTimingTerms] Update',
  props<{ id: number; changes: Partial<PaymentTimingTerm> }>()
);
export const updateEntitySuccess = createAction(
  '[PaymentTimingTerms] Update Success',
  props<{ id: number; changes: Partial<PaymentTimingTerm> }>()
);
export const updateEntityFailure = createAction(
  '[PaymentTimingTerms] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PaymentTimingTerms] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PaymentTimingTerms] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PaymentTimingTerms] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPaymentTimingTermHistory = createAction(
  '[PaymentTimingTerm/API] Load PaymentTimingTerm History'
);

export const loadPaymentTimingTermHistorySuccess = createAction(
  '[PaymentTimingTerm/API] Load PaymentTimingTerm History Success',
  props<{ history: PaymentTimingTerm[] }>()
);

export const loadPaymentTimingTermHistoryFailure = createAction(
  '[PaymentTimingTerm/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
