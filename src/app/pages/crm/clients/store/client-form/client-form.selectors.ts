// client‑form.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './client-form.reducer'; // Adjust the import path as necessary
// 1. Grab the entire slice
export const selectClientFormState = createFeatureSelector<State>('clientForm');

// 2. Derive just the `dirty` flag
export const selectFormDirty = createSelector(
  selectClientFormState,
  (state) => state.dirty
);
