import { Action, createReducer, on } from '@ngrx/store';
import * as BranchActions from './branches.actions';
import { adapter, initialState, State } from './branches.state';

/**
 * Feature key for the branches slice in the store
 */
export const branchFeatureKey = 'branches';

/**
 * Internal reducer created with NgRx `createReducer`.
 * Contains all `on(...)` handlers with debug logging.
 */
const branchesInternalReducer = createReducer(
  initialState,

  // Load all branches
  on(BranchActions.loadBranches, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(BranchActions.loadBranchesSuccess, (state, { branches }) => {
    console.log('📦 Items:', branches);
    const nextState = adapter.setAll(branches, {
      ...state,
      loading: false,
      error: null,
    });
    console.log('✅ State after setAll:', nextState);
    return nextState;
  }),

  on(BranchActions.loadBranchesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  // Load one branch
  on(BranchActions.loadBranchSuccess, (state, { branch }) => {
    return adapter.upsertOne(branch, {
      ...state,
      loadedId: branch.id,
      loading: false,
    });
  }),

  // Create a new branch
  on(BranchActions.createBranchSuccess, (state, { branch }) => {
    return adapter.addOne(branch, state);
  }),

  // Update an existing branch
  on(BranchActions.updateBranchSuccess, (state, { branch }) => {
    return adapter.updateOne({ id: branch.id, changes: branch }, state);
  }),

  // Delete a branch
  on(BranchActions.deleteBranchSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

/**
 * Exported reducer function for NgRx feature registration.
 * Wraps the internal reducer so NgRx can invoke it.
 */
export function branchesReducer(
  state: State | undefined,
  action: Action
): State {
  return branchesInternalReducer(state, action);
}

/**
 * Entity adapter selectors for the branches slice
 */
export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
