import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './sme-client-codes.reducer';
import { adapter, State } from './sme-client-codes.state';

export const selectFeature = createFeatureSelector<State>('sMEClientCodes');
export const selectSMEClientCodesFeature =
  createFeatureSelector<State>('sMEClientCodes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectSMEClientCodesFeature);

export const selectAllSMEClientCodes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectSMEClientCodeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectSMEClientCodesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectSMEClientCodesError = createSelector(
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
export const selectSMEClientCodesTotalCount = createSelector(
  selectSMEClientCodesFeature,
  (state) => state
);
// History management selectors
export const selectSMEClientCodeHistoryState = createFeatureSelector<State>(
  'sMEClientCodeHistory'
);

export const selectSMEClientCodeHistory = createSelector(
  selectSMEClientCodeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectSMEClientCodeHistoryState,
  (state) => state.historyLoaded
);
