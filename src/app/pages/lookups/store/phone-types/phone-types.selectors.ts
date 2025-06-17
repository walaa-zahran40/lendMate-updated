import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './phone-types.reducer';
import { adapter, State } from './phone-types.state';

export const selectFeature = createFeatureSelector<State>('phoneTypes');
export const selectPhoneTypesFeature =
  createFeatureSelector<State>('phoneTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectPhoneTypesFeature);

export const selectAllPhoneTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPhoneTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPhoneTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPhoneTypesError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

export const selectCurrent = createSelector(
  selectEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);
export const selectPhoneTypesTotalCount = createSelector(
  selectPhoneTypesFeature,
  (state) => state
);
// History management selectors
export const selectPhoneTypeHistoryState =
  createFeatureSelector<State>('phoneTypeHistory');

export const selectPhoneTypeHistory = createSelector(
  selectPhoneTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectPhoneTypeHistoryState,
  (state) => state.historyLoaded
);
