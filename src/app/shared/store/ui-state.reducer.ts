import { createReducer, on } from '@ngrx/store';
import { entityOperationSuccess } from '../../pages/lookups/store/sectors/sectors.actions';
export interface AppState {
  ui: UIState;
}
export interface UIState {
  lastOperationSuccess: { entity: string; operation: string } | null;
}

const initialState: UIState = {
  lastOperationSuccess: null,
};

export const uiReducer = createReducer(
  initialState,
  on(entityOperationSuccess, (state, { entity, operation }) => ({
    ...state,
    lastOperationSuccess: { entity, operation },
  }))
);
